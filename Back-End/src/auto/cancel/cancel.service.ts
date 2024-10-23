import {Injectable} from '@nestjs/common';
import * as moment from "moment-timezone";
import {DatabaseService} from "../../database/database.service";
import {ShareService} from "../../share/share.service";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class CancelService {
    private timeoutDeposit: number
    private timeoutWithdraw: number

    constructor(
        private databaseService: DatabaseService,
        private shareService: ShareService,
        private configService: ConfigService
    ) {
        this.timeoutDeposit = this.configService.get<number>('timeout_order.deposit')
        this.timeoutWithdraw = this.configService.get<number>('timeout_order.withdraw')
    }

    autoCancelOrder() {
        this.startAutoCancelOrder()
        return 'OK'
    }

    async startAutoCancelOrder() {
        if (this.timeoutDeposit) {
            const getOrder = await this.databaseService.depositRepository.find({
                where: {
                    status: 'wait'
                }
            })
            const checkTime = getOrder.filter(value => {
                const Timeout = moment(value.createdAt).add(this.timeoutDeposit, 'minutes')
                return !moment().isBetween(value.createdAt, Timeout)
            })
            for (const x of checkTime) {
                await this.shareService.banktransferSerivce.deposit.updateDepsoit({
                    role: 'auto'
                }, x.id, 'cancel', 'Timeout order')
            }
        }
        if (this.timeoutWithdraw) {
            const getOrder = await this.databaseService.withdrawRepository.find({
                where: {
                    status: 'wait'
                }
            })
            const checkTime = getOrder.filter(value => {
                const Timeout = moment(value.createdAt).add(this.timeoutWithdraw, 'minutes')
                return !moment().isBetween(value.createdAt, Timeout)
            })
            for (const x of checkTime) {
                await this.shareService.banktransferSerivce.withdraw.updateWithdraw({
                    role: 'auto'
                }, x.id, 'cancel', 'Timeout order')
            }
        }
    }

}
