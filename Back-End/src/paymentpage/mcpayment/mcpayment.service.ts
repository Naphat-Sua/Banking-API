import {BadRequestException, Injectable} from '@nestjs/common';
import {McpaymentDatabaseService} from "../../mcpayment-database/mcpayment-database.service";
import {DatabaseService} from "../../database/database.service";
import {ConfigService} from "@nestjs/config";
import {ShareService} from "../../share/share.service";
import * as crypto from 'crypto'

@Injectable()
export class McpaymentService {
    constructor(
        private database: DatabaseService,
        private mcpaymentDb: McpaymentDatabaseService,
        private config: ConfigService,
        private share: ShareService
    ) {
    }

    async getToken(token) {
        const getData = await this.mcpaymentDb.order.findOne({
            where: {
                token
            }
        })
        if (!getData) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have token'
            })
        }
        if (getData.use) {
            throw new BadRequestException({
                code: 400,
                message: 'Token already used'
            })
        }
        getData.use = true
        await this.mcpaymentDb.order.save(getData)

        return {
            id: getData.id,
            order: getData.orderid,
            type_payment: getData.typePayment
        }
    }

    async getTokenPayRedirect(token) {
        const getData = await this.mcpaymentDb.order.findOne({
            where: {
                token: token
            },
            relations: ['merchant', 'customer']
        })
        if (!getData) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have token'
            })
        }

        const getLink = await this.share.mcpaymentService.getLinkPaypage(getData.merchant.mid, getData.merchant.typeEnv, getData.currency, getData.amount, getData.token)

        return {
            redirect_url: getLink
        }
    }

    async getTokenDoPayment(token) {
        const getData = await this.mcpaymentDb.order.findOne({
            where: {
                token: token
            },
            relations: ['merchant', 'customer']
        })
        if (!getData) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have token'
            })
        }

        const beforeMsg = `${getData.merchant.secertkey}?mid=${getData.merchant.mid}&ref=${getData.token}&cur=${getData.currency}&amt=${getData.amount}`
        const hashMsg = crypto.createHash('MD5').update(beforeMsg).digest("hex")

        const Model = {
            env: getData.merchant.typeEnv,
            mid: getData.merchant.mid,
            shop: getData.customer.name,
            email: this.config.get<string>('email.username'),
            id: getData.token,
            orderid: getData.orderid,
            amount: getData.amount,
            currency: getData.currency,
            payment: getData.typePayment,
            lang: getData.lang,
            fgkey: hashMsg,
            return_url: `${this.config.get<string>('baseURL')}/callback/mcpayment/redirect`,
            status_url: `${this.config.get<string>('baseURL')}/callback/mcpayment/statusurl`
        }

        return Model

    }

    async getReturn(body) {
        const getData = await this.mcpaymentDb.order.findOne({
            where: {
                token: body.token
            },
            relations: ['merchant', 'customer'],
        })

        if (!getData) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have token'
            })
        }

        return {
            id: getData.token,
            orderid: getData.orderid,
            amount: getData.amount,
            currency: getData.currency,
            status: getData.status,
            payment: getData.typePayment,
            return_url: getData.returnUrl,
        }

    }
}
