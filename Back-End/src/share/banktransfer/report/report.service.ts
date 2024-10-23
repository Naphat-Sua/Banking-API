import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {DatabaseService} from "../../../database/database.service";
import {EmailService} from "../../../sendprovider/email/email.service";
import * as moment from 'moment-timezone'
import {Like} from "typeorm";
import {Parser} from 'json2csv'
import {ShareService} from "../../share.service";

@Injectable()
export class ReportService {

    constructor(
        private databaseService: DatabaseService,
        private emailService: EmailService,
        @Inject(forwardRef(() => ShareService))
        private shareService: ShareService
    ) {
    }

    async exportReport(email, query, id) {
        const whereQuery: any = {
            isDelete: false
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
            whereQuery.agentId = query.agent_id
        }
        const getCustomer = await this.databaseService.customerRepository.find({
            select: ['id', 'username'],
            where: whereQuery
        })
        let totalAllDeposit = 0
        let totalAllWithdraw = 0
        let totalAllSettlment = 0
        let totalAllMDR = 0

        const Result = []

        for (const x of getCustomer) {
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
                id: x.id,
                customer: x.username,
                total_deposit: resultGetDeposit.total_deposit ? resultGetDeposit.total_deposit : 0,
                total_deposit_mdr: resultGetDeposit.total_deposit_mdr ? resultGetDeposit.total_deposit_mdr : 0,
                total_withdraw: resultGetWithdraw.total_withdraw ? resultGetWithdraw.total_withdraw : 0,
                total_withdraw_mdr: resultGetWithdraw.total_withdraw_mdr ? resultGetWithdraw.total_withdraw_mdr : 0,
                total_settlement: resultGetSettlement.total_settlement ? resultGetSettlement.total_settlement : 0,
                total_settlement_mdr: resultGetSettlement.total_settlement_mdr ? resultGetSettlement.total_settlement_mdr : 0,
                total_settlement_fee: resultGetSettlement.total_settlement_fee ? resultGetSettlement.total_settlement_fee : 0,
            }
            modelData.total_mdr = modelData.total_deposit_mdr + modelData.total_withdraw_mdr + modelData.total_settlement_mdr + modelData.total_settlement_fee
            modelData.avg_mdr = 0
            Result.push(modelData)
            totalAllMDR += modelData.total_mdr
            totalAllDeposit += modelData.total_deposit
            totalAllWithdraw += modelData.total_withdraw
            totalAllSettlment += modelData.total_settlement
        }

        for (const x of Result) {
            const avgmdr = (x.total_mdr * 100) / totalAllMDR
            x.avg_mdr = avgmdr
        }
        const json2csvParser = new Parser({withBOM: true});
        const csv = json2csvParser.parse(Result);
        const MessageOptionsEmail = {
            to: email,
            subject: `Export report ${id}`,
            html: `Export file report id ${id}`,
            attachments: [
                {
                    filename: `ExportReport${id}.csv`,
                    content: Buffer.from(csv, 'utf-8')
                }
            ]
        }
        await this.emailService.sendEmail(MessageOptionsEmail)
    }
}
