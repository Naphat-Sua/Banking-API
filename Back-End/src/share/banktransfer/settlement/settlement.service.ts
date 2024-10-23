import {BadRequestException, forwardRef, Inject, Injectable} from '@nestjs/common';
import {DatabaseService} from "../../../database/database.service";
import {EmailService} from "../../../sendprovider/email/email.service";
import {ShareService} from "../../share.service";
import * as moment from "moment-timezone";
import {Parser} from 'json2csv'

@Injectable()
export class SettlementService {
    constructor(
        private databaseService: DatabaseService,
        private emailService: EmailService,
        @Inject(forwardRef(() => ShareService))
        private shareService: ShareService
    ) {
    }

    async getTotalSettlement(payload, query) {
        let statusSeach = false
        const getData = await this.databaseService.settlementRepository.createQueryBuilder('Settlement')
            .leftJoinAndSelect('Settlement.customer', 'Customer', 'Settlement.customerId IS NOT NULL')
            .leftJoinAndSelect('Customer.agent', 'Agent', 'Customer.agentId IS NOT NULL')
            .leftJoinAndSelect('Settlement.banktype', 'Banktype', 'Settlement.banktypeId IS NOT NULL')
            .select('SUM(Settlement.price)', 'total_amount')
            .addSelect('SUM(Settlement.price * (Settlement.mdr / 100)) + SUM(Settlement.fee)', 'total_mdr')
            .addSelect('SUM(Settlement.price) - (SUM(Settlement.price * (Settlement.mdr / 100)) + SUM(Settlement.fee))', 'total_netamount')
        if ((query.customerId && !isNaN(Number(query.customerId))) || payload.role === 'customer') {
            statusSeach = query.customerId ? true : false
            const customerId = payload.role === 'customer' ? Number(payload.id) : Number(query.customerId)
            await getData.andWhere('Customer.id = :customerId', {customerId: customerId})
        }
        if ((query.agentId && !isNaN(Number(query.agentId))) || payload.role === 'agent') {
            statusSeach = query.agentId ? true : false
            const agentId = payload.role === 'agent' ? Number(payload.id) : Number(payload.id)
            await getData.andWhere('Agent.id = :agentId', {agentId: agentId})
        }
        if (query.status) {
            statusSeach = true
            await getData.andWhere('Settlement.status = :status', {status: query.status})
        }
        if (query.price && !isNaN(query.price)) {
            statusSeach = true
            await getData.andWhere('Settlement.price >= :price', {price: Number(query.price)})
        }
        if (query.orderid) {
            statusSeach = true
            await getData.andWhere('Settlement.orderid LIKE :orderId', {orderId: `%${query.orderid}%`})
        }
        const regEx = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
        if ((query.from_create && regEx.test(query.from_create)) && (query.to_create && regEx.test(query.to_create))) {
            const startDate = moment(query.from_create + ' 00:00:00', 'YYYY-MM-DD HH:mm:ss');
            const endDate = moment(query.to_create + ' 23:59:59', 'YYYY-MM-DD HH:mm:ss');
            if (startDate.isValid() && endDate.isValid()) {
                await getData.andWhere('Settlement.createdAt >= :startdate_create', {startdate_create: startDate.toDate()});
                await getData.andWhere('Settlement.createdAt <= :enddate_create', {enddate_create: endDate.toDate()});
            }
        }
        if ((query.from_update && regEx.test(query.from_update)) && (query.to_update && regEx.test(query.to_update))) {
            const startDate = moment(query.from_update + ' 00:00:00', 'YYYY-MM-DD HH:mm:ss');
            const endDate = moment(query.to_update + ' 23:59:59', 'YYYY-MM-DD HH:mm:ss');
            if (startDate.isValid() && endDate.isValid()) {
                await getData.andWhere('Settlement.updatedAt >= :startdate_update', {startdate_update: startDate.toDate()});
                await getData.andWhere('Settlement.updatedAt <= :enddate_update', {enddate_update: endDate.toDate()});
            }
        }
        await getData.orderBy('Settlement.createdAt', 'DESC')

        const result = await getData.getRawOne()

        return result
    }

    async getDataSettlement(payload, query, page: number = 1, rows: number = 20) {
        const skip = (page - 1) * rows
        const getData = await this.databaseService.settlementRepository.createQueryBuilder('Settlement')
            .leftJoinAndSelect('Settlement.customer', 'Customer', 'Settlement.customerId IS NOT NULL')
            .leftJoinAndSelect('Customer.agent', 'Agent', 'Customer.agentId IS NOT NULL')
            .leftJoinAndSelect('Settlement.banktype', 'Banktype', 'Settlement.banktypeId IS NOT NULL')
        if ((query.customerId && !isNaN(Number(query.customerId))) || payload.role === 'customer') {
            const customerId = payload.role === 'customer' ? Number(payload.id) : Number(query.customerId)
            await getData.andWhere('Customer.id = :customerId', {customerId: customerId})
        }
        if ((query.agentId && !isNaN(Number(query.agentId))) || payload.role === 'agent') {
            const agentId = payload.role === 'agent' ? Number(payload.id) : Number(payload.id)
            await getData.andWhere('Agent.id = :agentId', {agentId: agentId})
        }
        if (query.status) {
            await getData.andWhere('Settlement.status = :status', {status: query.status})
        }
        if (query.price && !isNaN(query.price)) {
            await getData.andWhere('Settlement.price >= :price', {price: Number(query.price)})
        }
        if (query.orderid) {
            await getData.andWhere('Settlement.orderid LIKE :orderId', {orderId: `%${query.orderid}%`})
        }
        const regEx = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
        if ((query.from_create && regEx.test(query.from_create)) && (query.to_create && regEx.test(query.to_create))) {
            const startDate = moment(query.from_create + ' 00:00:00', 'YYYY-MM-DD HH:mm:ss');
            const endDate = moment(query.to_create + ' 23:59:59', 'YYYY-MM-DD HH:mm:ss');
            if (startDate.isValid() && endDate.isValid()) {
                await getData.andWhere('Settlement.createdAt >= :startdate_create', {startdate_create: startDate.toDate()});
                await getData.andWhere('Settlement.createdAt <= :enddate_create', {enddate_create: endDate.toDate()});
            }
        }
        if ((query.from_update && regEx.test(query.from_update)) && (query.to_update && regEx.test(query.to_update))) {
            const startDate = moment(query.from_update + ' 00:00:00', 'YYYY-MM-DD HH:mm:ss');
            const endDate = moment(query.to_update + ' 23:59:59', 'YYYY-MM-DD HH:mm:ss');
            if (startDate.isValid() && endDate.isValid()) {
                await getData.andWhere('Settlement.updatedAt >= :startdate_update', {startdate_update: startDate.toDate()});
                await getData.andWhere('Settlement.updatedAt <= :enddate_update', {enddate_update: endDate.toDate()});
            }
        }
        await getData.orderBy('Settlement.createdAt', 'DESC')
        await getData.limit(rows)
        await getData.offset(skip)
        return {
            count: await getData.getCount(),
            data: (await getData.getMany()).map(value => {
                return {
                    id: value.id,
                    orderid: value.orderid,
                    price: value.price,
                    to_banking: value.banktype ? value.banktype.key : '',
                    name: value.bankname,
                    account: value.bankaccount,
                    customer: value.customer ? {id: value.customer.id, name: value.customer.name} : null,
                    status: value.status,
                    image: value.image,
                    mdr: value.price * (value.mdr / 100),
                    fee: value.fee,
                    createdAt: moment(value.createdAt).toDate(),
                    updatedAt: moment(value.updatedAt).toDate()
                }
            })
        }
    }

    async exportDataSettlement(payload, email, query, id): Promise<void> {
        const getData = await this.databaseService.settlementRepository.createQueryBuilder('Settlement')
        await getData.leftJoinAndSelect('Settlement.customer', 'Customer', 'Settlement.customer IS NOT NULL')
        await getData.leftJoinAndSelect('Settlement.banktype', 'Banktype', 'Settlement.banktype IS NOT NULL')
        if ((query.customerId && !isNaN(Number(query.customerId))) || payload.role === 'customer') {
            const customerId = payload === 'customer' ? Number(payload.id) : Number(query.customerId)
            await getData.andWhere('Customer.id = :customerId', {customerId: customerId})
        }
        if ((query.agentId && !isNaN(Number(query.agentId))) || payload.role === 'agent') {
            const agentId = payload.role === 'agent' ? Number(payload.id) : Number(query.agentId)
            await getData.andWhere('Customer.agentId = :agentId', {agentId: agentId})
        }
        if (query.status) {
            await getData.andWhere('Settlement.status = :status', {status: query.status})
        }
        if (query.price && !isNaN(query.price)) {
            await getData.andWhere('Settlement.price >= :price', {price: Number(query.price)})
        }
        if (query.orderid) {
            await getData.andWhere('Settlement.orderid LIKE :orderId', {orderId: `%${query.orderid}%`})
        }
        const regEx = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
        if ((query.from_create && regEx.test(query.from_create)) && (query.to_create && regEx.test(query.to_create))) {
            const startDate = moment(query.from_create + ' 00:00:00', 'YYYY-MM-DD HH:mm:ss');
            const endDate = moment(query.to_create + ' 23:59:59', 'YYYY-MM-DD HH:mm:ss');
            if (startDate.isValid() && endDate.isValid()) {
                await getData.andWhere('Settlement.createdAt >= :startdate_create', {startdate_create: startDate.toDate()});
                await getData.andWhere('Settlement.createdAt <= :enddate_create', {enddate_create: endDate.toDate()});
            }
        }
        if ((query.from_update && regEx.test(query.from_update)) && (query.to_update && regEx.test(query.to_update))) {
            const startDate = moment(query.from_update + ' 00:00:00', 'YYYY-MM-DD HH:mm:ss');
            const endDate = moment(query.to_update + ' 23:59:59', 'YYYY-MM-DD HH:mm:ss');
            if (startDate.isValid() && endDate.isValid()) {
                await getData.andWhere('Settlement.updatedAt >= :startdate_update', {startdate_update: startDate.toDate()});
                await getData.andWhere('Settlement.updatedAt <= :enddate_update', {enddate_update: endDate.toDate()});
            }
        }
        const ResultData = []
        let TotalAmount = 0
        let TotalMdr = 0
        let Order = 0
        for (const x of await getData.getMany()) {
            const model = {
                id: x.id,
                orderid: x.orderid,
                price: x.price.toFixed(2),
                to_banking: x.banktype ? x.banktype.key : '',
                name: x.bankname,
                account: x.bankaccount,
                customer: x.customer ? {id: x.customer.id, name: x.customer.name} : null,
                status: x.status,
                image: x.image,
                mdr: (x.price * (x.mdr / 100)).toFixed(2),
                fee: x.fee.toFixed(2),
                createdAt: moment(x.createdAt).toDate(),
                updatedAt: moment(x.updatedAt).toDate()
            }
            ResultData.push(model)
            Order += 1
            TotalAmount += x.price
            TotalMdr += (x.price * (x.mdr / 100))
        }

        const json2csvParser = new Parser({withBOM: true});
        const csv = json2csvParser.parse(ResultData);
        const MessageOptionsEmail = {
            to: email,
            subject: `Export Settlement ${id}`,
            html: `<b>Count Order = ${Order}<br>TotalAmount = ${TotalAmount.toFixed(2)}<br>TotalMdr = ${TotalMdr.toFixed(2)}<br>TotalNetAmount = ${(TotalAmount - TotalMdr).toFixed(2)}</b>`,
            attachments: [
                {
                    filename: `ExportSettlement${id}.csv`,
                    content: Buffer.from(csv, 'utf-8')
                }
            ]
        }
        await this.emailService.sendEmail(MessageOptionsEmail)
    }

    async updateSettlement(payload, id, status, comment: string = null) {
        const getData = await this.databaseService.settlementRepository.findOne(id, {relations: ['customer', 'logsorders']})
        if (getData.logsorders[getData.logsorders.length - 1].status === status) {
            throw new BadRequestException({
                code: 400,
                message: 'You cannot update same last status'
            })
        }
        const oldStatus = getData.status
        if (payload.role === 'operation' || payload.role === 'customer') {
            throw new BadRequestException({
                code: 400,
                message: 'You cannot update status'
            })
        }
        const NewModel = {
            status,
            mdr: status === 'cancel' || getData.noMdr ? 0 : getData.customer.mdrSettlement,
            fee: status === 'cancel' || getData.noFee ? 0 : getData.customer.feeSettlement
        }
        const Result = await this.databaseService.settlementRepository.update(getData.id, NewModel)
        this.shareService.saveLogOrder(payload, {...getData, ...NewModel}, 'settlement', comment)
        this.shareService.webSocketsSerivce.serviceWebbackoffice.emitSocketsSettlementUpdate(getData.id)
        return {
            ...getData,
            ...NewModel
        }
    }
}
