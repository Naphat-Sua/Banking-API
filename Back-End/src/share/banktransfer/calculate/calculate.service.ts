import {Injectable, Logger} from '@nestjs/common';
import {DatabaseService} from "../../../database/database.service";

@Injectable()
export class CalculateService {
    constructor(
        private databaseService: DatabaseService
    ) {
    }

    async findPriceSatang(customer, account, price): Promise<number> {
        let finalPrice = price
        let SumPrice = 0
        let statusLoopStang = true
        do {
            const randomStang = '0' + '.' + Math.floor(Math.random() * 10) + '' + Math.floor(Math.random() * 10);
            const sum = parseFloat(String(finalPrice)) + parseFloat(randomStang)
            if (sum >= price) {
                const checkDeposit = await this.databaseService.depositRepository.find({
                    where: {
                        customerId: customer,
                        accountbankId: account,
                        price: sum,
                        status: 'wait'
                    }
                })
                if (checkDeposit.length === 0) {
                    SumPrice = sum
                    statusLoopStang = false
                }
            }
        } while (statusLoopStang)
        return Number(SumPrice.toFixed(2))
    }

    async balanceCustomer(customer) {
        const getCustomer = await this.databaseService.customerRepository.findOne({
            select: ['id'],
            where: {
                id: customer
            }
        })

        const getDeposit = await this.databaseService.depositRepository.createQueryBuilder('Deposit')
            .where('Deposit.status = :statusOrder', {statusOrder: 'success'})
            .andWhere('Deposit.customerId = :customer', {customer: getCustomer.id})
            .select('SUM(Deposit.price)', 'total_deposit')
            .addSelect('SUM(Deposit.price * (Deposit.mdr / 100))', 'total_deposit_mdr')
            .getRawOne()
        const getWithdraw = await this.databaseService.withdrawRepository.createQueryBuilder('Withdraw')
            .where('Withdraw.status = :statusOrder', {statusOrder: 'success'})
            .andWhere('Withdraw.customerId = :customer', {customer: getCustomer.id})
            .select('SUM(Withdraw.price)', 'total_withdraw')
            .addSelect('SUM(Withdraw.price * (Withdraw.mdr / 100))', 'total_withdraw_mdr')
            .getRawOne()
        const getSettlement = await this.databaseService.settlementRepository.createQueryBuilder('Settlement')
            .where('Settlement.status = :statusOrder', {statusOrder: 'success'})
            .andWhere('Settlement.customerId = :customer', {customer: getCustomer.id})
            .select('SUM(Settlement.price)', 'total_settlement')
            .addSelect('SUM(Settlement.price * (Settlement.mdr/ 100))', 'total_settlement_mdr')
            .addSelect('SUM(Settlement.fee)', 'total_settlement_fee')
            .getRawOne()

        const result = {
            total_deposit: getDeposit.total_deposit || getDeposit.total_deposit === 0 ? getDeposit.total_deposit : 0,
            total_deposit_mdr: getDeposit.total_deposit_mdr || getDeposit.total_deposit_mdr === 0 ? getDeposit.total_deposit_mdr : 0,
            total_withdraw: getWithdraw.total_withdraw || getWithdraw.total_withdraw === 0 ? getWithdraw.total_withdraw : 0,
            total_withdraw_mdr: getWithdraw.total_withdraw_mdr || getWithdraw.total_withdraw_mdr === 0 ? getWithdraw.total_withdraw_mdr : 0,
            total_settlement: getSettlement.total_settlement || getSettlement.total_settlement === 0 ? getSettlement.total_settlement : 0,
            total_settlement_mdr: getSettlement.total_settlement_mdr || getSettlement.total_settlement_mdr === 0 ? getSettlement.total_settlement_mdr : 0,
            total_settlement_fee: getSettlement.total_settlement_fee || getSettlement.total_settlement_fee === 0 ? getSettlement.total_settlement_fee : 0,
        }

        return result.total_deposit - (result.total_deposit_mdr + result.total_withdraw + result.total_withdraw_mdr + result.total_settlement + result.total_settlement_mdr + result.total_settlement_fee)
    }

    async updateDeposit(id, oldStatus) {
        const getData = await this.databaseService.depositRepository.findOne(id)
        const getTotal = await this.databaseService.totalCustomerBanktransfer.findOne({customerId: getData.customerId})
        Logger.debug(`Update Deposit ${getData.id} status ${getData.status} price ${getData.price} mdr ${getData.price * (getData.mdr / 100)}`)
        if (getData && getTotal) {
            Logger.debug(`Deposit old price ${getTotal.deposit} , mdr ${getTotal.mdrDeposit}`)
            if (getData.status === 'success') {
                getTotal.deposit += getData.price
                getTotal.mdrDeposit += getData.price * (getData.mdr / 100)
            }
            if (oldStatus === 'success' && (getData.status === 'cancel' || getData.status === 'edit' || getData.status === 'refund')) {
                getTotal.deposit -= getData.price
                getTotal.mdrDeposit -= getData.price * (getData.mdr / 100)
            }
            Logger.debug(`Deposit price ${getTotal.deposit} , mdr ${getTotal.mdrDeposit}`)
            const Result = await this.databaseService.totalCustomerBanktransfer.save(getTotal)
        }

    }

    async updateWithdraw(id, oldStatus) {
        const getData = await this.databaseService.withdrawRepository.findOne(id)
        const getTotal = await this.databaseService.totalCustomerBanktransfer.findOne({customerId: getData.customerId})
        Logger.debug(`Update Withdraw ${getData.id} status ${getData.status} price ${getData.price} mdr ${getData.price * (getData.mdr / 100)}`)
        if (getData && getTotal) {
            Logger.debug(`Withdraw old price ${getTotal.withdraw} , mdr ${getTotal.mdrWithdraw}`)
            if (getData.status === 'success') {
                getTotal.withdraw += getData.price
                getTotal.mdrWithdraw += getData.price * (getData.mdr / 100)
            }
            if (oldStatus === 'success' && (getData.status === 'cancel' || getData.status === 'edit')) {
                getTotal.withdraw -= getData.price
                getTotal.mdrWithdraw -= getData.price * (getData.mdr / 100)
            }
            Logger.debug(`Withdraw price ${getTotal.withdraw} , mdr ${getTotal.mdrWithdraw}`)
            const Result = await this.databaseService.totalCustomerBanktransfer.save(getTotal)
        }

    }

    async updateSettlement(id, oldStatus) {
        const getData = await this.databaseService.settlementRepository.findOne(id)
        const getTotal = await this.databaseService.totalCustomerBanktransfer.findOne({customerId: getData.customerId})
        Logger.debug(`Update Settlement ${getData.id} status ${getData.status} price ${getData.price} mdr ${getData.price * (getData.mdr / 100)} fee ${getData.fee}`)
        if (getData && getTotal) {
            Logger.debug(`Settlement old price ${getTotal.settlement} , mdr ${getTotal.mdrSettlement} , fee ${getTotal.feeSettlement}`)
            if (getData.status === 'success') {
                getTotal.settlement += getData.price
                getTotal.mdrSettlement += getData.price * (getData.mdr / 100)
                getTotal.feeSettlement += getData.fee
            }
            if (oldStatus === 'success' && (getData.status === 'cancel' || getData.status === 'edit')) {
                getTotal.settlement -= getData.price
                getTotal.mdrSettlement -= getData.price * (getData.mdr / 100)
                getTotal.feeSettlement -= getData.fee
            }
            Logger.debug(`Settlement price ${getTotal.deposit} , mdr ${getTotal.mdrDeposit}, fee ${getTotal.feeSettlement}`)
            const Result = await this.databaseService.totalCustomerBanktransfer.save(getTotal)
        }
    }
}
