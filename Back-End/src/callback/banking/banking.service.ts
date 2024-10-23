import {Injectable, Logger} from '@nestjs/common';
import {DatabaseService} from "../../database/database.service";
import {ShareService} from "../../share/share.service";

@Injectable()
export class BankingService {
    constructor(
        private database: DatabaseService,
        private share: ShareService
    ) {
    }

    async autoDeposit(token, body) {
        for (const x of body) {
            const getOrder = await this.database.depositRepository.find({
                select: ['id', "qrcode", "price", "fromBank", "fromAccount", "fromName"],
                where: {
                    accountbankId: token,
                    price: x.amount,
                    status: 'wait'
                }
            })
            if (getOrder.length === 1 && getOrder[0].qrcode) {
                await this.share.banktransferSerivce.deposit.updateDepositByAutoApp(getOrder[0].id, x.message_detail)
            } else {
                const filterBankTransfer = await getOrder.filter(value => value.fromAccount && value.fromBank && !value.qrcode)
                if (filterBankTransfer.length > 0) {
                    const findOrder = filterBankTransfer.findIndex(value => value.fromBank === x.from_bank && value.fromAccount.indexOf(x.from_bankaccount) > 0)
                    Logger.debug(findOrder)
                    if (findOrder >= 0) {
                        await this.share.banktransferSerivce.deposit.updateDepositByAutoApp(filterBankTransfer[findOrder].id, x.message_detail)
                    }
                }
            }
        }
    }

    async autoWithdraw(body) {
        const getOrder = await this.database.withdrawRepository.findOne({
            select: ['id'],
            where: {
                token: body.orderid
            }
        })
        if (getOrder) {
            const status = body.status === 'success' ? 'success' : 'cancel'
            await this.share.banktransferSerivce.withdraw.udateWithdrawByAutoBanking(getOrder.id, status, status === 'success' ? body.transaction_id : null)
        }
        return 'OK'
    }

    async updateBalanceAccount(token, body) {
        const getAccount = await this.database.accountbankRepository.findOne({
            select: ['id'],
            where: {
                id: token
            }
        })
        if (getAccount) {
            await this.database.accountbankRepository.update(getAccount.id, {balance: body.amount})
        }
        return 'OK'
    }
}
