import {Injectable, Logger} from '@nestjs/common';
import {DatabaseService} from "../../database/database.service";

@Injectable()
export class TotalService {
    constructor(
        private databaseService: DatabaseService
    ) {
    }

    allSumTotal() {
        this.sumTotal()
        return 'start'
    }

    async sumTotal(): Promise<void> {
        const FinalResult = []
        const getCustomer = await this.databaseService.customerRepository.find()
        for (const x of getCustomer) {
            await this.resetTotal(x.id)
            const Total = {
                deposit: 0,
                mdrDeposit: 0,
                withdraw: 0,
                mdrWithdraw: 0,
                settlement: 0,
                mdrSettlement: 0,
                feeSettlement: 0
            }
            const getDeposit = await this.databaseService.depositRepository.find({
                where: {
                    customerId: x.id,
                    status: 'success'
                }
            })
            for (const y of getDeposit) {
                Total.deposit += y.price
                Total.mdrDeposit += (y.price * (y.mdr / 100))
            }
            const getWithdraw = await this.databaseService.withdrawRepository.find({
                where: {
                    customerId: x.id,
                    status: 'success'
                }
            })
            for (const y of getWithdraw) {
                Total.withdraw += y.price
                Total.mdrWithdraw += (y.price * (y.mdr / 100))
            }
            const getSettlement = await this.databaseService.settlementRepository.find({
                where: {
                    customerId: x.id,
                    status: 'success'
                }
            })

            for (const y of getSettlement) {
                Total.settlement += y.price
                Total.mdrSettlement += (y.price * (y.mdr / 100))
                Total.feeSettlement += y.fee
            }

            const getTotal = await this.databaseService.totalCustomerBanktransfer.findOne({where: {customerId: x.id}})
            getTotal.deposit += Total.deposit
            getTotal.withdraw += Total.withdraw
            getTotal.settlement += Total.settlement
            getTotal.mdrDeposit += Total.mdrDeposit
            getTotal.mdrWithdraw += Total.mdrWithdraw
            getTotal.mdrSettlement += Total.mdrSettlement
            getTotal.feeSettlement += Total.feeSettlement
            const Result = await this.databaseService.totalCustomerBanktransfer.save(getTotal)
            FinalResult.push(Result)
        }
        Logger.debug(FinalResult)
    }

    async resetTotal(customer): Promise<void> {
        const getTotal = await this.databaseService.totalCustomerBanktransfer.findOne({where: {customerId: customer}})
        const Result = await this.databaseService.totalCustomerBanktransfer.save({
            ...getTotal,
            deposit: 0,
            mdrDeposit: 0,
            withdraw: 0,
            mdrWithdraw: 0,
            settlement: 0,
            mdrSettlement: 0,
            feeSettlement: 0
        })
        Logger.debug(Result)
    }
}
