import {BadRequestException, Injectable, OnModuleInit} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {v4 as uuidv4} from 'uuid';
import {DatabaseService} from "../../../../database/database.service";
import {McpaymentDatabaseService} from "../../../../mcpayment-database/mcpayment-database.service";
import {OrderInput} from "./dto/order.input";
import {QueryInput} from "./dto/query.input";
import {ShareService} from "../../../../share/share.service";
import {CreateWithdrawInput} from "./dto/create-withdraw.input";
import moment = require("moment-timezone");

@Injectable()
export class McpaymentService implements OnModuleInit {
    private urlApi: string

    constructor(
        private database: DatabaseService,
        private mcpaymentDb: McpaymentDatabaseService,
        private config: ConfigService,
        private share: ShareService
    ) {
        this.urlApi = this.config.get<string>('redirect_mcpayment')
    }

    onModuleInit(): any {
        this.setUpDataCustomer()
    }

    async setUpDataCustomer() {
        const getCustomer = await this.database.customerRepository.find()
        for (const x of getCustomer) {
            const checkCustomer = await this.mcpaymentDb.customer.findOne({
                where: {
                    mainId: x.id
                }
            })
            if (!checkCustomer) {
                const Model = {
                    mainId: x.id,
                    name: x.name,
                    key: x.authApi,
                    secertkey: x.secertkey,
                    encrypto: x.encrypto,
                    isBan: x.ban
                }
                const create = await this.mcpaymentDb.customer.create(Model)
                const result = await this.mcpaymentDb.customer.save(create)
            }
        }
    }

    async createOrder(body: OrderInput, Auth) {
        const env = body.env === 'TEST' ? 'TEST' : body.env === 'LIVE' ? 'LIVE' : this.config.get<string>('env_mcpayment')
        let getMcCustomer = await this.mcpaymentDb.customer.findOne({
            where: {
                key: Auth
            },
            relations: ['mcpaymentCustomerDeals', 'mcpaymentCustomerDeals.merchant'],
        })

        if (getMcCustomer.mcpaymentCustomerDeals.length === 0) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have deal merchant'
            })
        }

        const cutMerchantMid = getMcCustomer.mcpaymentCustomerDeals.filter(value => value.type === body.type && value.currency === body.currency && (value.merchant && value.merchant.typeEnv === env))

        if (cutMerchantMid.length === 0) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have type payment or currency payment'
            })
        }

        const randomMerchant = Math.floor(Math.random() * cutMerchantMid.length);
        const modelOrder = {
            merchantId: cutMerchantMid[randomMerchant].merchantId,
            orderid: body.orderid,
            token: uuidv4(),
            customerId: getMcCustomer.id,
            currency: body.currency,
            amount: (body.price / 100),
            lang: body.lang,
            status: 'wait',
            returnUrl: body.redirect_url,
            statusUrl: body.callback,
            typePayment: body.type
        };

        const create = await this.mcpaymentDb.order.create(modelOrder)
        const result = await this.mcpaymentDb.order.save(create)

        this.share.webhookService.notifyFromMcPayment(result.id)

        return {
            id: result.token,
            orderid: result.orderid,
            redirect_url: `${this.urlApi}/loading?token=${result.token}`
        }
    }


    async queryOrder(body: QueryInput, Auth) {
        const getCustomer = await this.database.customerRepository.findOne({
            where: {
                authApi: Auth,
                ban: false
            }
        })
        if (!getCustomer) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have customer id'
            })
        }

        const getMcCustomer = await this.mcpaymentDb.customer.findOne({
            where: {
                mainId: getCustomer.id
            }
        })

        if (!getMcCustomer) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have customer id'
            })
        }

        const getData = await this.mcpaymentDb.order.findOne({
            where: {
                token: body.id,
                orderid: body.orderid,
                customerId: getMcCustomer.id
            },
            relations: ['mcpaymentCallbacks'],
        })

        return {
            id: getData.token,
            transid: getData.mcpaymentCallbacks.length > 0 ? getData.mcpaymentCallbacks[getData.mcpaymentCallbacks.length - 1].transid : null,
            orderid: getData.orderid,
            currency: getData.currency,
            price: getData.amount,
            cardno: getData.mcpaymentCallbacks.length > 0 ? getData.mcpaymentCallbacks[getData.mcpaymentCallbacks.length - 1].cardno : null,
            cardname: getData.mcpaymentCallbacks.length > 0 ? getData.mcpaymentCallbacks[getData.mcpaymentCallbacks.length - 1].cardname : null,
            type_card: getData.mcpaymentCallbacks.length > 0 ? getData.mcpaymentCallbacks[getData.mcpaymentCallbacks.length - 1].cardco : null,
            message: getData.mcpaymentCallbacks.length > 0 ? getData.mcpaymentCallbacks[getData.mcpaymentCallbacks.length - 1].resmsg : null,
            status: getData.status,
            created_at: moment(getData.createdAt).toDate(),
            updated_at: moment(getData.updatedAt).toDate()
        }
    }

    async getBalance(Auth) {
        const getCustomer = await this.database.customerRepository.findOne({
            where: {
                authApi: Auth,
                ban: false
            }
        })

        if (!getCustomer) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have customer id'
            })
        }

        const getMcCustomer = await this.mcpaymentDb.customer.findOne({
            where: {
                mainId: getCustomer.id
            }
        })

        if (!getMcCustomer) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have customer id'
            })
        }
        const getDeal = await this.mcpaymentDb.customerDeal.find({
            where: {
                customerId: getMcCustomer.id
            },
            relations: ['merchant']
        })

        const result = []

        for (const x of getDeal) {
            const findIndex = result.findIndex(value => value.type === x.type && value.currency === x.currency)
            if (findIndex < 0) {
                result.push({
                    type: x.type,
                    currency: x.currency,
                    balance: 0
                })
            }
        }

        const getOrder = await this.mcpaymentDb.order.find({
            where: {
                customerId: getMcCustomer.id,
                status: 'success'
            }
        })

        for (const x of getOrder) {
            const findIndex = result.findIndex(value => value.type === x.typePayment && value.currency === x.currency)
            if (findIndex >= 0) {
                result[findIndex].balance += (x.amount - ((x.amount * x.mdr) / 100))
            }
        }

        const getWithdraw = await this.mcpaymentDb.withdraw.find({
            where: {
                customerId: getMcCustomer.id,
                status: 'success'
            }
        })

        for (const x of getWithdraw) {
            const findIndex = result.findIndex(value => value.currency === x.currency)
            if (findIndex >= 0) {
                result[findIndex].balance -= (x.amount + ((x.amount * x.mdr) / 100))
            }
        }

        return result

    }

    async createWithdraw(body: CreateWithdrawInput, Auth) {
        const getCustomer = await this.database.customerRepository.findOne({
            where: {
                authApi: Auth,
                ban: false
            }
        })

        if (!getCustomer) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have customer id'
            })
        }

        const getMcCustomer = await this.mcpaymentDb.customer.findOne({
            where: {
                mainId: getCustomer.id
            }
        })

        if (!getMcCustomer) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have customer id'
            })
        }

        const getDeal = await this.mcpaymentDb.customerDeal.find({
            where: {
                customerId: getMcCustomer.id
            }
        })

        const findCurrency = getDeal.findIndex(value => value.currency === body.currency)
        if (findCurrency < 0) {
            throw new BadRequestException({
                code: 400,
                message: 'You don\'t have a currency deal.'
            })
        }

        const getWithdraw = await this.mcpaymentDb.withdraw.findOne({
            where: {
                orderid: body.orderid
            }
        })

        if (getWithdraw) {
            throw new BadRequestException({
                code: 400,
                message: 'You already have this orderid in the system.'
            })
        }

        const modelCreate = {
            orderid: body.orderid,
            customerId: getMcCustomer.id,
            token: uuidv4(),
            amount: body.price,
            status: 'success',
            currency: body.currency,
            mdr: getDeal[findCurrency].mdrPayout,
            comment: `${body.id_card ? `IDCARD: ${body.id_card}` : ''}${body.bank ? `, Bank: ${body.bank}` : ''}${body.accountbank ? `, Account: ${body.accountbank}` : ''}`
        }

        const create = await this.mcpaymentDb.withdraw.create(modelCreate)
        const result = await this.mcpaymentDb.withdraw.save(create)

        this.share.webhookService.notifyWithdrawFromMcPayment(result.id)

        return {
            id: result.token,
            order: result.orderid
        }

    }
}
