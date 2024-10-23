import {BadRequestException, forwardRef, Inject, Injectable, Logger} from '@nestjs/common';
import {DatabaseService} from "../../../database/database.service";
import {EmailService} from "../../../sendprovider/email/email.service";
import {ShareService} from "../../share.service";
import * as moment from "moment-timezone";
import * as request from 'request'
import {Parser} from 'json2csv'
import {v4 as uuidv4} from 'uuid';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class WithdrawService {
    private baseURLBanking: string = null
    private withdrawAuto: boolean = false

    constructor(
        private databaseService: DatabaseService,
        private emailService: EmailService,
        @Inject(forwardRef(() => ShareService))
        private shareService: ShareService,
        private configService: ConfigService
    ) {
        this.baseURLBanking = this.configService.get<string>('baseURLBanking')
        this.withdrawAuto = this.configService.get<boolean>('autoWithdraw')
    }

    async getTotalWithdraw(payload, query) {
        let statusSeach = false
        const getData = await this.databaseService.withdrawRepository.createQueryBuilder('Withdraw')
            .leftJoinAndSelect('Withdraw.customer', 'Customer', 'Withdraw.customerId IS NOT NULL')
            .leftJoinAndSelect('Customer.agent', 'Agent', 'Customer.agentId IS NOT NULL')
            .select('SUM(Withdraw.price)', 'total_amount')
            .addSelect('SUM(Withdraw.price * (Withdraw.mdr / 100)) + SUM(Withdraw.fee)', 'total_mdr')
            .addSelect('SUM(Withdraw.price) - (SUM(Withdraw.price * (Withdraw.mdr / 100)) + SUM(Withdraw.fee))', 'total_netamount')
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
            await getData.andWhere('Withdraw.status = :status', {status: query.status})
        }
        if (query.price && !isNaN(query.price)) {
            statusSeach = true
            await getData.andWhere('Withdraw.price >= :price', {price: Number(query.price)})
        }
        if (query.orderid) {
            statusSeach = true
            await getData.andWhere('Withdraw.orderid LIKE :orderId', {orderId: `%${query.orderid}%`})
        }
        const regEx = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
        if ((query.from_create && regEx.test(query.from_create)) && (query.to_create && regEx.test(query.to_create))) {
            const startDate = moment(query.from_create + ' 00:00:00', 'YYYY-MM-DD HH:mm:ss');
            const endDate = moment(query.to_create + ' 23:59:59', 'YYYY-MM-DD HH:mm:ss');
            if (startDate.isValid() && endDate.isValid()) {
                await getData.andWhere('Withdraw.createdAt >= :startdate_create', {startdate_create: startDate.toDate()});
                await getData.andWhere('Withdraw.createdAt <= :enddate_create', {enddate_create: endDate.toDate()});
            }
        }
        if ((query.from_update && regEx.test(query.from_update)) && (query.to_update && regEx.test(query.to_update))) {
            const startDate = moment(query.from_update + ' 00:00:00', 'YYYY-MM-DD HH:mm:ss');
            const endDate = moment(query.to_update + ' 23:59:59', 'YYYY-MM-DD HH:mm:ss');
            if (startDate.isValid() && endDate.isValid()) {
                await getData.andWhere('Withdraw.updatedAt >= :startdate_update', {startdate_update: startDate.toDate()});
                await getData.andWhere('Withdraw.updatedAt <= :enddate_update', {enddate_update: endDate.toDate()});
            }
        }

        const result = await getData.getRawOne()

        return result
    }

    async getDataWithdraw(payload, query, page, rows) {
        const skip = (page - 1) * rows
        const getData = await this.databaseService.withdrawRepository.createQueryBuilder('Withdraw')
            .leftJoinAndSelect('Withdraw.customer', 'Customer', 'Withdraw.customerId IS NOT NULL')
            .leftJoinAndSelect('Customer.agent', 'Agent', 'Customer.agentId IS NOT NULL')
        if ((query.customerId && !isNaN(Number(query.customerId))) || payload.role === 'customer') {
            const customerId = payload.role === 'customer' ? Number(payload.id) : Number(query.customerId)
            await getData.andWhere('Customer.id = :customerId', {customerId: customerId})
        }
        if ((query.agentId && !isNaN(Number(query.agentId))) || payload.role === 'agent') {
            const agentId = payload.role === 'agent' ? Number(payload.id) : Number(payload.id)
            await getData.andWhere('Agent.id = :agentId', {agentId: agentId})
        }
        if (query.status) {
            await getData.andWhere('Withdraw.status = :status', {status: query.status})
        }
        if (query.price && !isNaN(query.price)) {
            await getData.andWhere('Withdraw.price >= :price', {price: Number(query.price)})
        }
        if (query.orderid) {
            await getData.andWhere('Withdraw.orderid LIKE :orderId', {orderId: `%${query.orderid}%`})
        }
        const regEx = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
        if ((query.from_create && regEx.test(query.from_create)) && (query.to_create && regEx.test(query.to_create))) {
            const startDate = moment(query.from_create + ' 00:00:00', 'YYYY-MM-DD HH:mm:ss');
            const endDate = moment(query.to_create + ' 23:59:59', 'YYYY-MM-DD HH:mm:ss');
            if (startDate.isValid() && endDate.isValid()) {
                await getData.andWhere('Withdraw.createdAt >= :startdate_create', {startdate_create: startDate.toDate()});
                await getData.andWhere('Withdraw.createdAt <= :enddate_create', {enddate_create: endDate.toDate()});
            }
        }
        if ((query.from_update && regEx.test(query.from_update)) && (query.to_update && regEx.test(query.to_update))) {
            const startDate = moment(query.from_update + ' 00:00:00', 'YYYY-MM-DD HH:mm:ss');
            const endDate = moment(query.to_update + ' 23:59:59', 'YYYY-MM-DD HH:mm:ss');
            if (startDate.isValid() && endDate.isValid()) {
                await getData.andWhere('Withdraw.updatedAt >= :startdate_update', {startdate_update: startDate.toDate()});
                await getData.andWhere('Withdraw.updatedAt <= :enddate_update', {enddate_update: endDate.toDate()});
            }
        }
        await getData.limit(rows)
        await getData.offset(skip)
        await getData.orderBy('Withdraw.createdAt', 'DESC')

        return {
            count: await getData.getCount(),
            data: await (await getData.getMany()).map(value => {
                return {
                    id: value.id,
                    orderid: value.orderid,
                    account: value.account,
                    name: value.name,
                    to_banking: value.toBanking,
                    price: value.price,
                    mdr: value.price * (value.mdr / 100),
                    customer: value.customer ? {id: value.customer.id, name: value.customer.name} : null,
                    status: value.status,
                    image: value.image,
                    createdAt: moment(value.createdAt).toDate(),
                    updatedAt: moment(value.updatedAt).toDate()
                }
            })
        }
    }

    async exportDataWithdraw(payload, email, query, id): Promise<void> {
        const getData = await this.databaseService.withdrawRepository.createQueryBuilder('Withdraw')
        await getData.leftJoinAndSelect('Withdraw.logsorders', 'Logsorders')
        await getData.leftJoinAndSelect('Withdraw.customer', 'Customer', 'Withdraw.customer IS NOT NULL')
        if ((query.customerId && !isNaN(Number(query.customerId))) || payload.role === 'customer') {
            const customerId = payload.role === 'customer' ? Number(payload.id) : Number(query.customerId)
            await getData.andWhere('Customer.id = :customerId', {customerId: customerId})
        }
        if ((query.agentId && !isNaN(Number(query.agentId))) || payload.role === 'agent') {
            const agentId = payload.role === 'agent' ? Number(payload.id) : Number(query.agentId)
            await getData.andWhere('Customer.agentId = :agentId', {agentId: agentId})
        }
        if (query.status) {
            await getData.andWhere('Withdraw.status = :status', {status: query.status})
        }
        if (query.price && !isNaN(query.price)) {
            await getData.andWhere('Withdraw.price >= :price', {price: Number(query.price)})
        }
        if (query.orderid) {
            await getData.andWhere('Withdraw.orderid LIKE :orderId', {orderId: `%${query.orderid}%`})
        }
        const regEx = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
        if ((query.from_create && regEx.test(query.from_create)) && (query.to_create && regEx.test(query.to_create))) {
            const startDate = moment(query.from_create + ' 00:00:00', 'YYYY-MM-DD HH:mm:ss');
            const endDate = moment(query.to_create + ' 23:59:59', 'YYYY-MM-DD HH:mm:ss');
            if (startDate.isValid() && endDate.isValid()) {
                await getData.andWhere('Withdraw.createdAt >= :startdate_create', {startdate_create: startDate.toDate()});
                await getData.andWhere('Withdraw.createdAt <= :enddate_create', {enddate_create: endDate.toDate()});
            }
        }
        if ((query.from_update && regEx.test(query.from_update)) && (query.to_update && regEx.test(query.to_update))) {
            const startDate = moment(query.from_update + ' 00:00:00', 'YYYY-MM-DD HH:mm:ss');
            const endDate = moment(query.to_update + ' 23:59:59', 'YYYY-MM-DD HH:mm:ss');
            if (startDate.isValid() && endDate.isValid()) {
                await getData.andWhere('Withdraw.updatedAt >= :startdate_update', {startdate_update: startDate.toDate()});
                await getData.andWhere('Withdraw.updatedAt <= :enddate_update', {enddate_update: endDate.toDate()});
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
                account: x.account,
                name: x.name,
                to_banking: x.toBanking,
                price: x.price.toFixed(2),
                mdr: (x.price * (x.mdr / 100)).toFixed(2),
                customer: x.customer ? x.customer.name : null,
                status: x.status,
                image: x.image,
                createdAt: moment(x.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: moment(x.updatedAt).format('YYYY-MM-DD HH:mm:ss')
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
            subject: `Export Withdraw ${id}`,
            html: `<b>Count Order = ${Order}<br>TotalAmount = ${TotalAmount.toFixed(2)}<br>TotalMdr = ${TotalMdr.toFixed(2)}<br>TotalNetAmount = ${(TotalAmount - TotalMdr).toFixed(2)}</b>`,
            attachments: [
                {
                    filename: `ExportWithdraw${id}.csv`,
                    content: Buffer.from(csv, 'utf-8')
                }
            ]
        }
        this.emailService.sendEmail(MessageOptionsEmail)
    }

    async udateWithdrawByAutoBanking(id, status, comment: string = null) {
        const getData = await this.databaseService.withdrawRepository.findOne(id, {relations: ['customer', 'logsorders']})
        const NewModel = {
            status,
            mdr: status === 'cancel' ? 0 : getData.customer.mdrWithdraw
        }
        const Result = await this.databaseService.withdrawRepository.update(getData.id, NewModel)
        this.shareService.saveLogOrder({
            role: 'auto'
        }, {...getData, ...NewModel}, 'withdraw', comment)
        if (getData.sendCallback) {
            await this.shareService.webhookService.hookToCustomer(getData.id, 'withdraw')
        }
        this.shareService.webSocketsSerivce.serviceWebbackoffice.emitSocketsWithdrawUpdate(getData.id)
        return {
            ...getData,
            ...NewModel
        }
    }

    async updateWithdraw(payload, id, status, comment: string = null) {
        const getData = await this.databaseService.withdrawRepository.findOne(id, {relations: ['customer', 'logsorders']})
        if (getData.logsorders.length > 0 && getData.logsorders[getData.logsorders.length - 1].status === status) {
            throw new BadRequestException({
                code: 400,
                message: 'You cannot update same last status'
            })
        }
        if (payload.role === 'customer') {
            throw new BadRequestException({
                code: 400,
                message: 'You cannot update status'
            })
        }

        const NewModel = {
            status,
            mdr: status === 'cancel' ? 0 : getData.customer.mdrWithdraw
        }
        const Result = await this.databaseService.withdrawRepository.update(getData.id, NewModel)
        this.shareService.saveLogOrder(payload, {...getData, ...NewModel}, 'withdraw', comment)
        if (getData.sendCallback) {
            await this.shareService.webhookService.hookToCustomer(getData.id, 'withdraw')
        }
        this.shareService.webSocketsSerivce.serviceWebbackoffice.emitSocketsWithdrawUpdate(getData.id)
        return {
            ...getData,
            ...NewModel
        }
    }

    async createWithdraw(payload, customer, orderid, price, from, comment: string = null, callback: string = null, sendcallback: boolean = true) {
        const Model = {
            customerId: customer,
            orderid: orderid,
            token: uuidv4(),
            account: from.account,
            toBanking: from.to_banking,
            price: price,
            name: from.name,
            status: 'wait',
            callback,
            sendcallback
        }
        const Create = await this.databaseService.withdrawRepository.create(Model)
        const result = await this.databaseService.withdrawRepository.insert(Create)
        const resultInsert = await this.databaseService.withdrawRepository.findOne(result.raw.insertId)
        this.shareService.saveLogOrder(payload, resultInsert, 'withdraw', comment)
        this.shareService.webhookService.convertToMessage('withdraw', result.raw.insertId, 'create')
        this.shareService.webSocketsSerivce.serviceWebbackoffice.emitSocketCreate('withdraw', result.raw.insertId)
        if (this.baseURLBanking && this.withdrawAuto) {
            this.autoWithdraw(result.raw.insertId, customer)
        }
        return resultInsert
    }

    async autoWithdraw(withdrawId: number, customerId: number) {
        const getAccountBank = await this.databaseService.mutiAccountRepository.find({
            where: {
                customerId
            },
            relations: ['account']
        })
        const cutAccountAuto = getAccountBank.filter(value => value.account && value.account.tokenCommand && value.account.balance > 0)
        if (cutAccountAuto.length > 0) {
            const getWithdraw = await this.databaseService.withdrawRepository.findOne({
                select: ["id", 'price', "orderid", "token", "toBanking", "account"],
                where: {
                    id: withdrawId
                }
            })
            const cutAccountBalance = cutAccountAuto.filter(value => value.account && value.account.balance >= getWithdraw.price)
            if (cutAccountBalance.length > 0) {
                const randomAccount = Math.floor(Math.random() * cutAccountBalance.length)
                const getTypeBank = await this.databaseService.typebankRepository.findOne({
                    select: ["key"],
                    where: {
                        id: cutAccountBalance[randomAccount].account.banktypeId
                    }
                })
                const urlWithdraw = `${this.baseURLBanking}/bank/${getTypeBank.key.toLowerCase()}/withdraw`
                request({
                    url: urlWithdraw,
                    method: 'POST',
                    headers: {
                        'x-api-key': cutAccountBalance[randomAccount].account.tokenCommand
                    },
                    body: {
                        orderid: getWithdraw.token,
                        amount: getWithdraw.price,
                        to_account: getWithdraw.account,
                        to_bank: getWithdraw.toBanking,
                        comment: `ID ${getWithdraw.id}`
                    },
                    json: true
                }, (err, resp, body) => {
                    if (body) {
                        Logger.debug(`Auto Withdraw token ${getWithdraw.token} ${JSON.stringify(body)}`)
                    }
                })
            }
        }
    }
}
