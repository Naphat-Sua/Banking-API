import {BadRequestException, Injectable} from '@nestjs/common';
import {ShareService} from "../../share/share.service";
import * as moment from "moment-timezone";
import {DatabaseService} from "../../database/database.service";
import {AddWithdrawInput} from "./dto/add-withdraw.input";

@Injectable()
export class WithdrawService {
    constructor(
        private databaseService: DatabaseService,
        private shareService: ShareService
    ) {
    }

    async totalWithdraw(payload, query) {
        return await this.shareService.banktransferSerivce.withdraw.getTotalWithdraw(payload, query)
    }

    async findWithdraw(payload, query, page: number = 1, rows: number = 20) {
        return await this.shareService.banktransferSerivce.withdraw.getDataWithdraw(payload, query, page, rows)
    }

    async exportWithdraw(payload, query) {
        const getUser = await this.databaseService.customerRepository.findOne(payload.id)
        if (!getUser.email) {
            throw new BadRequestException({
                code: 400,
                message: 'You have not email'
            })
        }
        const idExport = moment().format('YYYYMMDDHHmmss')
        this.shareService.banktransferSerivce.withdraw.exportDataWithdraw(payload, getUser.email, query, idExport)
        return {
            id: idExport
        }
    }

    async addWithdraw(payload, body: AddWithdrawInput) {
        const getTotal = await this.databaseService.totalCustomerBanktransfer.findOne({
            where: {
                customerId: payload.id
            }
        })
        const calBalance = getTotal.deposit - (getTotal.mdrDeposit + getTotal.withdraw + getTotal.mdrWithdraw + getTotal.settlement + getTotal.mdrSettlement + getTotal.feeSettlement)
        if (body.price > calBalance) {
            throw new BadRequestException({
                code: 400,
                message: 'You don\'t have enough available funds to withdraw.'
            })
        }
        const checkOrderId = await this.databaseService.withdrawRepository.findOne({
            where: {
                customerId: payload.id,
                orderid: body.orderid
            }
        })
        if (checkOrderId) {
            throw new BadRequestException({
                code: 400,
                message: 'You can not use orderid'
            })
        }
        const getBankKey = await this.databaseService.typebankRepository.findOne(body.to_banking)
        if (!getBankKey) {
            throw new BadRequestException({
                code: 400,
                message: 'Have not type bank id'
            })
        }
        const from = {
            account: body.account,
            to_banking: getBankKey.key,
            name: body.name
        }
        const sendcallback = body.send_callback ? true : false
        const callback_url = body.callback ? body.callback : null
        const Result = await this.shareService.banktransferSerivce.withdraw.createWithdraw(payload, payload.id, body.orderid, body.price, from, 'Create On Web', callback_url, sendcallback)
        return {
            id: Result.id,
            token: Result.token,
            orderid: Result.orderid
        }
    }
}
