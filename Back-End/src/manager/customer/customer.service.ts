import {Injectable} from '@nestjs/common';
import {DatabaseService} from "../../database/database.service";
import {GetBalanceOutput} from "../../admin/customer/dto/get-balance.output";
import {Like} from "typeorm";
import * as moment from "moment-timezone";

@Injectable()
export class CustomerService {
    constructor(
        private databaseService: DatabaseService
    ) {
    }

    async customerTotalAndBalance(query, page: number = 1, rows: number = 20): Promise<GetBalanceOutput> {
        const skip = (page - 1) * rows
        const whereQuery: any = {
            isDelete: false
        }
        if (query.customer_id && !isNaN(Number(query.customer_id))) {
            whereQuery.id = Number(query.customer_id)
        }
        if (query.name) {
            whereQuery.name = Like(`%${query.name}%`)
        }

        if (query.username) {
            whereQuery.username = Like(`%${query.username}%`)
        }

        if (query.email) {
            whereQuery.email = Like(`%${query.email}%`)
        }

        if (query.agent_id && !isNaN(Number(query.agent_id))) {
            whereQuery.agentId = Number(query.agent_id)
        }
        const getCustomer = await this.databaseService.customerRepository.findAndCount({
            select: ['id', 'name', 'username'],
            where: whereQuery,
            take: rows,
            skip
        })
        const Result = []
        for (const x of getCustomer[0]) {
            const getDeposit = await this.databaseService.depositRepository.createQueryBuilder('Deposit')
                .where('Deposit.status = :statusOrder', {statusOrder: 'success'})
                .andWhere('Deposit.customerId = :customer', {customer: x.id})
                .select('SUM(Deposit.price)', 'total_deposit')
                .addSelect('SUM(Deposit.price * (Deposit.mdr / 100))', 'total_deposit_mdr')
            const getWithdraw = await this.databaseService.withdrawRepository.createQueryBuilder('Withdraw')
                .where('Withdraw.status = :statusOrder', {statusOrder: 'success'})
                .andWhere('Withdraw.customerId = :customer', {customer: x.id})
                .select('SUM(Withdraw.price)', 'total_withdraw')
                .addSelect('SUM(Withdraw.price * (Withdraw.mdr / 100))', 'total_withdraw_mdr')
            const getSettlement = await this.databaseService.settlementRepository.createQueryBuilder('Settlement')
                .where('Settlement.status = :statusOrder', {statusOrder: 'success'})
                .andWhere('Settlement.customerId = :customer', {customer: x.id})
                .select('SUM(Settlement.price)', 'total_settlement')
                .addSelect('SUM(Settlement.price * (Settlement.mdr/ 100))', 'total_settlement_mdr')
                .addSelect('SUM(Settlement.fee)', 'total_settlement_fee')
            const regEx = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
            if (query.from_update && regEx.test(query.from_update) && query.to_update && regEx.test(query.to_update)) {
                const startDate = moment(query.from_update + ' 00:00:00', 'YYYY-MM-DD HH:mm:ss')
                const updateDate = moment(query.to_update + ' 23:59:59', 'YYYY-MM-DD HH:mm:ss')
                await getDeposit.andWhere('Deposit.updatedAt BETWEEN :startDate AND :endDate', {
                    startDate: startDate.toDate(),
                    endDate: updateDate.toDate()
                })
                await getWithdraw.andWhere('Withdraw.updatedAt BETWEEN :startDate AND :endDate', {
                    startDate: startDate.toDate(),
                    endDate: updateDate.toDate()
                })
                await getSettlement.andWhere('Settlement.updatedAt BETWEEN :startDate AND :endDate', {
                    startDate: startDate.toDate(),
                    endDate: updateDate.toDate()
                })
            }
            const resultGetDeposit = await getDeposit.getRawOne()
            const resultGetWithdraw = await getWithdraw.getRawOne()
            const resultGetSettlement = await getSettlement.getRawOne()
            const modelData: any = {
                customer: {
                    id: x.id,
                    name: x.name,
                    username: x.username
                },
                total: {
                    deposit: resultGetDeposit.total_deposit ? resultGetDeposit.total_deposit : 0,
                    withdraw: resultGetWithdraw.total_withdraw ? resultGetWithdraw.total_withdraw : 0,
                    settlement: resultGetSettlement.total_settlement ? resultGetSettlement.total_settlement : 0,
                    mdr_deposit: resultGetDeposit.total_deposit_mdr ? resultGetDeposit.total_deposit_mdr : 0,
                    mdr_withdraw: resultGetWithdraw.total_withdraw_mdr ? resultGetWithdraw.total_withdraw_mdr : 0,
                    mdr_settlement: resultGetSettlement.total_settlement_mdr ? resultGetSettlement.total_settlement_mdr : 0,
                    fee_settlement: resultGetSettlement.total_settlement_fee ? resultGetSettlement.total_settlement_fee : 0,
                }
            }
            modelData.balance = modelData.total.deposit - (modelData.total.mdr_deposit + modelData.total.withdraw + modelData.total.settlement + modelData.total.mdr_withdraw + modelData.total.mdr_settlement + modelData.total.fee_settlement)
            Result.push(modelData)
        }
        return {
            count: getCustomer[1],
            data: Result
        }
    }
}
