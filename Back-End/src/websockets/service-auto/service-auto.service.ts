import {Injectable, Logger} from '@nestjs/common';
import {DatabaseService} from "../../database/database.service";
import * as moment from "moment-timezone";
import {ShareService} from "../../share/share.service";

@Injectable()
export class ServiceAutoService {
    constructor(
        private database: DatabaseService,
        private share: ShareService
    ) {
    }

    async autoBanktransferDepositCancelTimeout(minutes) {
        const getOrder = await this.database.depositRepository.find({
            where: {
                status: 'wait'
            }
        })
        const cutOrderTimeout = getOrder.filter(value => {
            const Timeout = moment(value.createdAt).add(minutes, 'minutes')
            return !moment().isBetween(value.createdAt, Timeout)
        })
        for (const x of cutOrderTimeout) {
            x.status = 'cancel'
            const result = await this.database.depositRepository.save(x)
            await this.share.saveLogOrder({role: 'auto'}, result, 'deposit', `Timeout order ${minutes} minutes`)
            this.share.webhookService.hookToCustomer(result.id, 'deposit')
            this.share.webhookService.convertToMessage('deposit', result.id, 'update')
            this.share.webSocketsSerivce.serviceWebbackoffice.emitSocketCreate('deposit', result.id)
        }
    }

    async autoBanktransferDepositSuccessByAppSCB(data) {
        if ((data.status && data.status.code === 1000) && data.data) {
            const cutDataDeposit = await data.data.txnList.filter(value => value.txnCode.code === 'X1')
            Logger.debug(`Count Deposit ${cutDataDeposit.length} in App`)
            const dataCovert = await cutDataDeposit.map(value => {
                value.covert = this.share.banktransferSerivce.covertMessageAuto.scbPinApp(value)
                return value
            })
            Logger.debug(JSON.stringify(dataCovert))
            const getAccount = await this.database.accountbankRepository.findOne({
                where: {
                    account: data.data.accountNo
                }
            })
            Logger.debug(`GetAccount result ${getAccount ? getAccount.id : 'NotData'}`)
            if (getAccount) {
                const getDeposit = await this.database.depositRepository.find({
                    where: {
                        accountbankId: getAccount.id,
                        status: 'wait'
                    }
                })
                Logger.debug(`Deposit ${getDeposit.length} order status wait`)
                if (getDeposit.length > 0) {
                    for (const x of dataCovert) {
                        Logger.debug(`Check Data in App ${x.txnRemark} จำนวนเงิน ${x.txnAmount} บาท เวลา ${moment(x.txnDateTime).format('YYYY-MM-DD HH:mm:ss')}`)
                        const findIndexDeposit = getDeposit.findIndex(value => (((x.covert.bank === 'TTB' ? value.fromBank === 'TMB' || value.fromBank === 'TBANK' : value.fromBank === x.covert.bank) && value.fromAccount.indexOf(x.covert.account) >= 0) || ((value.fromBank === 'SCB' && value.fromName.indexOf(x.covert.name)) >= 0 && value.fromAccount.indexOf(x.covert.account) >= 0)) && value.price === x.txnAmount)
                        if (findIndexDeposit >= 0) {
                            Logger.debug(`findData result deposit id: ${getDeposit[findIndexDeposit].id}`)
                            const startTime = moment(getDeposit[findIndexDeposit].createdAt)
                            const endTime = moment(getDeposit[findIndexDeposit].createdAt).add(5, 'minutes')
                            const checkTime = moment(x.covert.time).isBetween(startTime, endTime)
                            Logger.debug(`CheckTime result: ${checkTime}`)
                            if (checkTime) {
                                this.share.banktransferSerivce.deposit.updateDepositByAutoScbPinApp(getDeposit[findIndexDeposit].id, x)
                            }
                        }
                    }
                }

            }
        }
    }
}
