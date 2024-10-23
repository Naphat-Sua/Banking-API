import {BadRequestException, Injectable} from '@nestjs/common';
import {ShareService} from "../../share/share.service";
import * as moment from "moment-timezone";
import {DatabaseService} from "../../database/database.service";
import {AddDepositInput} from "./dto/add-deposit.input";
import {ExportDepositOutput} from "./dto/export-deposit.output";

@Injectable()
export class DepositService {
    constructor(
        private databaseService: DatabaseService,
        private shareService: ShareService
    ) {
    }

    async totalDeposit(payload, query) {
        return await this.shareService.banktransferSerivce.deposit.getTotalDeposit(payload, query)
    }

    async exportDeposit(payload, query): Promise<ExportDepositOutput> {
        const getUser = await this.databaseService.customerRepository.findOne(payload.id)
        if (!getUser.email) {
            throw new BadRequestException({
                code: 400,
                message: 'You have not email'
            })
        }
        const idExport = moment().format('YYYYMMDDHHmmss')
        await this.shareService.banktransferSerivce.deposit.exportDataDeposit(payload, getUser.email, query, idExport)
        return {
            id: idExport
        }
    }

    async findDeposit(payload, query, page: number = 1, rows: number = 20) {
        return await this.shareService.banktransferSerivce.deposit.getDataDeposit(payload, query, page, rows)
    }

    async addDeposit(payload, body: AddDepositInput) {
        const checkOrderId = await this.databaseService.depositRepository.find({
            where: {
                customerId: payload.id,
                orderid: body.orderid
            }
        })
        if (checkOrderId.length > 0) {
            throw new BadRequestException({
                code: 400,
                message: 'You can not use orderid'
            })
        }
        const use_promptpay = body.qrcode ? true : false
        const getAccount = await this.shareService.banktransferSerivce.accountbank.getAccountCustomer(payload.id, use_promptpay)
        if (getAccount.length === 0) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have account bank'
            })
        }
        const random = Math.floor(Math.random() * getAccount.length)
        const accountBankId = getAccount[random].id
        const from_bank = {
            from_account: body.from_account,
            from_name: body.from_name,
            from_bank: body.from_bank
        }
        const Result = body.qrcode ? await this.shareService.banktransferSerivce.deposit.createDepositQrcode(payload, payload.id, accountBankId, body.orderid, body.price, 'Create On Web', body.callback, body.send_callback) : await this.shareService.banktransferSerivce.deposit.createDepositTransfer(payload, payload.id, accountBankId, body.orderid, body.price, from_bank, 'Create On Web', body.callback, body.send_callback)
        return {
            id: Result.id,
            token: Result.token,
            link: `${this.shareService.configService.get<string>('redirectURL')}/bt?token=${Result.token}`,
        }
    }
}
