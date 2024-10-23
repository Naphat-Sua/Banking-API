import {BadRequestException, Injectable} from '@nestjs/common';
import {BanktransferService} from "../banktransfer.service";
import {DatabaseService} from "../../../../database/database.service";
import {ShareService} from "../../../../share/share.service";
import {CreateDepositAutoqrcodeOutput} from "./dto/create-deposit-autoqrcode.output";
import {CreateDepositAutoqrcodeInput} from "../dto/create-deposit-autoqrcode.input";
import {CreateDepositTransferInput} from "./dto/create-deposit-transfer.input";
import {CreateDepositTransferOutput} from "./dto/create-deposit-transfer.output";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class HuayService {
    constructor(
        private database: DatabaseService,
        private banktransfer: BanktransferService,
        private share: ShareService,
        private configService: ConfigService
    ) {
    }

    async createDepositTransfer(body: CreateDepositTransferInput, Authorization): Promise<CreateDepositTransferOutput> {
        const random_satang = body.random_satang === true || body.random_satang === false ? body.random_satang : true
        const realPrice = body.price / 100
        const getCustomer = await this.database.customerRepository.findOne({
            where: {
                authApi: Authorization
            }
        })
        let getAccount = await this.share.banktransferSerivce.accountbank.getAccountCustomer(getCustomer, false)
        getAccount = body.from_bank === 'KBANK' ? getAccount.filter(value => value.banktype && value.banktype.key === 'KBANK') : getAccount.filter(value => value.banktype && value.banktype.key === 'SCB')
        if (getAccount.length === 0) {
            throw new BadRequestException({
                code: 400,
                message: 'You have not account bank'
            })
        }
        const checkOrderId = await this.database.depositRepository.findOne({
            where: {
                customerId: getCustomer.id,
                orderid: body.orderid
            }
        })
        if (checkOrderId) {
            throw new BadRequestException({
                code: 400,
                message: 'You cannot use orderid'
            })
        }
        let findIndex = body.account ? await getAccount.findIndex(value => value.account === body.account) : -1
        if (findIndex < 0) {
            findIndex = Math.floor(Math.random() * getAccount.length)
        }
        let use_account = await getAccount[findIndex]
        const payload = {
            role: 'customer',
            id: getCustomer.id
        }
        const from = {
            from_account: body.from_account ? body.from_account : null,
            from_bank: body.from_bank ? body.from_bank : null,
            from_name: body.from_name ? body.from_name : null
        }

        const result = await this.share.banktransferSerivce.deposit.createDepositTransfer(payload, getCustomer.id, use_account.id, body.orderid, realPrice, from, 'Create On API', body.callback, true, random_satang , body.comment)

        const Result = {
            code: 200,
            id: result.token,
            orderid: result.orderid,
            redirect_url: `${this.share.configService.get<string>('redirectURL')}/bt?token=${result.token}`,
            price: parseInt(parseFloat(String(result.price * 100)).toPrecision(12)),
            accountbank: {
                account: use_account.account,
                name: use_account.name,
                bank: use_account.banktype.key
            }
        }

        return {
            ...Result,
            signature: await this.share.encryptSignatureMD5(getCustomer.secertkey, Result)
        }
    }

    async createDepositAutoQrcode(body: CreateDepositAutoqrcodeInput, Authorization): Promise<CreateDepositAutoqrcodeOutput> {
        const result_create = await this.banktransfer.createOrderDepositQRcode(body, Authorization)
        delete result_create.signature
        const getData = await this.database.depositRepository.findOne({
            where: {
                token: result_create.id,
                orderid: result_create.orderid
            },
            relations: ['customer']
        })
        const getAccount = await this.database.accountbankRepository.findOne({
            where: {
                id: getData.accountbankId
            },
            relations: ['banktype']
        })

        const Result = {
            ...result_create,
            price: parseInt(parseFloat(String(result_create.price * 100)).toPrecision(12)),
            image: `${this.configService.get<string>('baseURL')}/api/v1/unipay/image/qrcode?token=${getData.token}`,
            accountbank: {
                account: getAccount.account,
                name: getAccount.name,
                bank: getAccount.banktype.key
            }
        }
        return {
            ...Result,
            signature: await this.share.encryptSignatureMD5(getData.customer.secertkey, Result)
        }
    }

}
