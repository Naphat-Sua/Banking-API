import {BadRequestException, Injectable, Logger} from '@nestjs/common';
import {DatabaseService} from "../../database/database.service";
import * as moment from "moment-timezone";
import {Between} from "typeorm";

@Injectable()
export class DashboardService {
    constructor(
        private databaseService: DatabaseService
    ) {
    }

    async TotalBox(payload) {
        const getCustomer = await this.databaseService.customerRepository.findOne({
            select: ['id'],
            where: {
                id: payload.id
            }
        })
        if (!getCustomer) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have customer id'
            })
        }
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
            total_deposit: getDeposit.total_deposit ? getDeposit.total_deposit : 0,
            total_withdraw: (getWithdraw.total_withdraw ? getWithdraw.total_withdraw : 0) + (getSettlement.total_settlement ? getSettlement.total_settlement : 0),
            total_mdr: (getDeposit.total_deposit_mdr ? getDeposit.total_deposit_mdr : 0) + (getWithdraw.total_withdraw_mdr ? getWithdraw.total_withdraw_mdr : 0) + (getSettlement.total_settlement_mdr ? getSettlement.total_settlement_mdr : 0),
            total_fee: getSettlement.total_settlement_fee ? getSettlement.total_settlement_fee : 0,
            balance: 0,
            updatedAt: moment().toDate()
        }

        result.balance = result.total_deposit - (result.total_withdraw + result.total_mdr + result.total_fee)

        return result
    }

    async totalBoxThisMonth(payload) {
        const startDate = moment().startOf('month');
        const endDate = moment().endOf('month')
        const start = startDate.toDate()
        const end = endDate.toDate()
        const getCustomer = await this.databaseService.customerRepository.findOne(payload.id)
        if (!getCustomer) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have customer id'
            })
        }
        const getTotalCustomer = await this.databaseService.totalCustomerBanktransfer.findOne({
            where: {
                customerId: getCustomer.id
            }
        })

        if (!getTotalCustomer) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have balance id in database'
            })
        }
        const getDeposit = await this.databaseService.depositRepository.find({
            where: {
                customerId: payload.id,
                status: 'success',
                updatedAt: Between(start, end)
            }
        })
        const getWithdraw = await this.databaseService.withdrawRepository.find({
            where: {
                customerId: payload.id,
                status: 'success',
                updatedAt: Between(start, end)
            }
        })
        const getSettlement = await this.databaseService.settlementRepository.find({
            where: {
                customerId: payload.id,
                status: 'success',
                updatedAt: Between(start, end)
            }
        })
        let totalDeposit = 0
        let totalWithdraw = 0
        let totalSettlement = 0
        let totalMdr = 0
        let totalFee = 0
        for (const x of getSettlement) {
            totalSettlement += x.price
            totalMdr += x.price * (x.mdr / 100)
            totalFee += x.fee
        }
        for (const x of getWithdraw) {
            totalWithdraw += x.price
            totalMdr += x.price * (x.mdr / 100)
        }

        for (const x of getDeposit) {
            totalDeposit += x.price
            totalMdr += x.price * (x.mdr / 100)
        }
        return {
            total_deposit: totalDeposit,
            total_withdraw: totalWithdraw + totalSettlement,
            total_mdr: totalMdr,
            total_fee: totalFee,
            balance: getTotalCustomer.deposit - (getTotalCustomer.withdraw + getTotalCustomer.settlement + getTotalCustomer.mdrDeposit + getTotalCustomer.mdrSettlement + getTotalCustomer.mdrWithdraw + getTotalCustomer.feeSettlement),
            updatedAt: getTotalCustomer.updatedAt
        }
    }

    async TotalThisMonth(payload) {
        const getCustomer = await this.databaseService.customerRepository.findOne({
            select: ['id'],
            where: {
                id: payload.id
            }
        })
        const startDate = moment().startOf('month');
        const endDate = moment().endOf('month').endOf('day')
        const getDeposit = await this.databaseService.depositRepository.createQueryBuilder('Deposit')
            .where('Deposit.status = :statusOrder', {statusOrder: 'success'})
            .andWhere('Deposit.customerId = :customer', {customer: getCustomer.id})
            .andWhere('Deposit.updatedAt BETWEEN :startTime AND :endTime', {
                startTime: startDate.toDate(),
                endTime: endDate.toDate()
            })
            .select('SUM(Deposit.price)', 'total_deposit')
            .addSelect('SUM(Deposit.price * (Deposit.mdr / 100))', 'total_deposit_mdr')
            .getRawOne()
        const getWithdraw = await this.databaseService.withdrawRepository.createQueryBuilder('Withdraw')
            .where('Withdraw.status = :statusOrder', {statusOrder: 'success'})
            .andWhere('Withdraw.customerId = :customer', {customer: getCustomer.id})
            .andWhere('Withdraw.updatedAt BETWEEN :startTime AND :endTime', {
                startTime: startDate.toDate(),
                endTime: endDate.toDate()
            })
            .select('SUM(Withdraw.price)', 'total_withdraw')
            .addSelect('SUM(Withdraw.price * (Withdraw.mdr / 100))', 'total_withdraw_mdr')
            .getRawOne()
        const getSettlement = await this.databaseService.settlementRepository.createQueryBuilder('Settlement')
            .where('Settlement.status = :statusOrder', {statusOrder: 'success'})
            .andWhere('Settlement.customerId = :customer', {customer: getCustomer.id})
            .andWhere('Settlement.updatedAt BETWEEN :startTime AND :endTime', {
                startTime: startDate.toDate(),
                endTime: endDate.toDate()
            })
            .select('SUM(Settlement.price)', 'total_settlement')
            .addSelect('SUM(Settlement.price * (Settlement.mdr/ 100))', 'total_settlement_mdr')
            .addSelect('SUM(Settlement.fee)', 'total_settlement_fee')
            .getRawOne()

        const result = {
            total_deposit: getDeposit.total_deposit ? getDeposit.total_deposit : 0,
            total_withdraw: getWithdraw.total_withdraw ? getWithdraw.total_withdraw : 0,
            total_settlement: getSettlement.total_settlement ? getSettlement.total_settlement : 0,
            total_mdr: (getDeposit.total_deposit_mdr ? getDeposit.total_deposit_mdr : 0) + (getWithdraw.total_withdraw_mdr ? getWithdraw.total_withdraw_mdr : 0) + (getSettlement.total_settlement_mdr ? getSettlement.total_settlement_mdr : 0),
            total_fee: getSettlement.total_settlement_fee ? getSettlement.total_settlement_fee : 0
        }

        return result
    }

    async TotalChart(payload) {
        const getCustomer = await this.databaseService.customerRepository.findOne({
            select: ['id'],
            where: {
                id: payload.id
            }
        })
        const startDate = moment().startOf('month');
        const endDate = moment().endOf('month')

        const getDeposit = await this.databaseService.depositRepository.createQueryBuilder('Deposit')
            .where('Deposit.status = :statusOrder', {statusOrder: 'success'})
            .andWhere('Deposit.customerId = :customer', {customer: getCustomer.id})
            .andWhere('Deposit.updatedAt BETWEEN :startTime AND :endTime', {
                startTime: startDate.toDate(),
                endTime: endDate.toDate()
            })
            .select('DATE_FORMAT(Deposit.updatedAt, %Y-%m-%d)', 'days')
            .addSelect('SUM(Deposit.price)', 'total_deposit')
            .addSelect('SUM(Deposit.price * (Deposit.mdr / 100))', 'total_deposit_mdr')
            .groupBy('days')
            .getRawMany()
        const getWithdraw = await this.databaseService.withdrawRepository.createQueryBuilder('Withdraw')
            .where('Withdraw.status = :statusOrder', {statusOrder: 'success'})
            .andWhere('Withdraw.customerId = :customer', {customer: getCustomer.id})
            .andWhere('Withdraw.updatedAt BETWEEN :startTime AND :endTime', {
                startTime: startDate.toDate(),
                endTime: endDate.toDate()
            })
            .select('DATE_FORMAT(Withdraw.updatedAt, %Y-%m-%d)', 'days')
            .addSelect('SUM(Withdraw.price)', 'total_withdraw')
            .addSelect('SUM(Withdraw.price * (Withdraw.mdr / 100))', 'total_withdraw_mdr')
            .groupBy('days')
            .getRawMany()
        const getSettlement = await this.databaseService.settlementRepository.createQueryBuilder('Settlement')
            .where('Settlement.status = :statusOrder', {statusOrder: 'success'})
            .andWhere('Settlement.customerId = :customer', {customer: getCustomer.id})
            .andWhere('Settlement.updatedAt BETWEEN :startTime AND :endTime', {
                startTime: startDate.toDate(),
                endTime: endDate.toDate()
            })
            .select('DATE_FORMAT(Settlement.updatedAt, %Y-%m-%d)', 'days')
            .addSelect('SUM(Settlement.price)', 'total_settlement')
            .addSelect('SUM(Settlement.price * (Settlement.mdr/ 100))', 'total_settlement_mdr')
            .addSelect('SUM(Settlement.fee)', 'total_settlement_fee')
            .groupBy('days')
            .getRawMany()
        const Result = []
        do {
            if (Result.length === 0) {
                Result.push({
                    days: startDate.format('YYYY-MM-DD'),
                    total_deposit: 0,
                    total_withdraw: 0,
                    total_settlement: 0,
                    total_mdr: 0,
                    total_fee: 0
                })
            } else {
                const lastDays = moment(Result[Result.length - 1].days).add(1, 'days').format('YYYY-MM-DD')
                Result.push({
                    days: lastDays,
                    total_deposit: 0,
                    total_withdraw: 0,
                    total_settlement: 0,
                    total_mdr: 0,
                    total_fee: 0
                })
            }
        } while (Result[Result.length - 1].days !== endDate.format('YYYY-MM-DD'))
        for (const x of getDeposit) {
            const findIndex = Result.findIndex(value => value.days === x.days)
            if (findIndex >= 0) {
                Result[findIndex].total_deposit += x.total_deposit
                Result[findIndex].total_mdr += x.total_deposit_mdr
            }
        }
        for (const x of getWithdraw) {
            const findIndex = Result.findIndex(value => value.days === x.days)
            if (findIndex >= 0) {
                Result[findIndex].total_withdraw += x.total_withdraw
                Result[findIndex].total_mdr += x.total_withdraw_mdr
            }
        }
        for (const x of getSettlement) {
            const findIndex = Result.findIndex(value => value.days === x.days)
            if (findIndex >= 0) {
                Result[findIndex].total_settlement += x.total_settlement
                Result[findIndex].total_mdr += x.total_settlement_mdr
                Result[findIndex].total_fee += x.total_settlement_fee
            }
        }

        return Result
    }
}
