import {BadRequestException, forwardRef, Inject, Injectable, Logger} from '@nestjs/common';
import {DatabaseService} from "../../../database/database.service";
import {EmailService} from "../../../sendprovider/email/email.service";
import {ShareService} from "../../share.service";
import * as moment from "moment-timezone";
import {Parser} from 'json2csv'
import {v4 as uuidv4} from 'uuid';
import * as Jimp from 'jimp';
import * as qrCode from 'qrcode-reader';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class DepositService {
    private baseURLBanking: string

    constructor(
        private databaseService: DatabaseService,
        private emailService: EmailService,
        @Inject(forwardRef(() => ShareService))
        private shareService: ShareService,
        private configService: ConfigService
    ) {
        this.baseURLBanking = this.configService.get<string>('baseURLBanking')
    }

    async getTotalDeposit(payload, query) {
        let statusSeach = false
        const getData = await this.databaseService.depositRepository.createQueryBuilder('Deposit')
            .leftJoinAndSelect('Deposit.customer', 'Customer', 'Deposit.customerId IS NOT NULL')
            .leftJoinAndSelect('Deposit.accountbank', 'AccountBank', 'Deposit.accountbankId IS NOT NULL')
            .leftJoinAndSelect('Customer.agent', 'Agent', 'Customer.agentId IS NOT NULL')
            .leftJoinAndSelect('AccountBank.banktype', 'Banktype', 'AccountBank.banktypeId IS NOT NULL')
            .select('SUM(Deposit.price)', 'total_amount')
            .addSelect('SUM(Deposit.price * (Deposit.mdr / 100))', 'total_mdr')
            .addSelect('SUM(Deposit.price) - SUM(Deposit.price * (Deposit.mdr / 100))', 'total_netamount')
        if (query.accountId && !isNaN(Number(query.accountId))) {
            statusSeach = true
            await getData.andWhere('AccountBank.id = :accountId', {accountId: Number(query.accountId)})
        }
        if (query.banktypeId && !isNaN(Number(query.banktypeId))) {
            statusSeach = true
            await getData.andWhere('Banktype.id = :banktypeId', {banktypeId: Number(query.banktypeId)})
        }
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
            await getData.andWhere('Deposit.status = :status', {status: query.status})
        }
        if (query.price && !isNaN(query.price)) {
            statusSeach = true
            await getData.andWhere('Deposit.price >= :price', {price: Number(query.price)})
        }
        if (query.orderid) {
            statusSeach = true
            await getData.andWhere('Deposit.orderid LIKE :orderId', {orderId: `%${query.orderid}%`})
        }
        const regEx = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
        if ((query.from_create && regEx.test(query.from_create)) && (query.to_create && regEx.test(query.to_create))) {
            const startDate = moment(query.from_create + ' 00:00:00', 'YYYY-MM-DD HH:mm:ss');
            const endDate = moment(query.to_create + ' 23:59:59', 'YYYY-MM-DD HH:mm:ss');
            if (startDate.isValid() && endDate.isValid()) {
                await getData.andWhere('Deposit.createdAt >= :startdate_create', {startdate_create: startDate.toDate()});
                await getData.andWhere('Deposit.createdAt <= :enddate_create', {enddate_create: endDate.toDate()});
            }
        }
        if ((query.from_update && regEx.test(query.from_update)) && (query.to_update && regEx.test(query.to_update))) {
            const startDate = moment(query.from_update + ' 00:00:00', 'YYYY-MM-DD HH:mm:ss');
            const endDate = moment(query.to_update + ' 23:59:59', 'YYYY-MM-DD HH:mm:ss');
            if (startDate.isValid() && endDate.isValid()) {
                await getData.andWhere('Deposit.updatedAt >= :startdate_update', {startdate_update: startDate.toDate()});
                await getData.andWhere('Deposit.updatedAt <= :enddate_update', {enddate_update: endDate.toDate()});
            }
        }
        const result = await getData.getRawOne()
        return result
    }

    async getDataDeposit(payload, query, page, rows) {
        const skip = (page - 1) * rows
        const getData = await this.databaseService.depositRepository.createQueryBuilder('Deposit')
            .leftJoinAndSelect('Deposit.customer', 'Customer', 'Deposit.customerId IS NOT NULL')
            .leftJoinAndSelect('Deposit.accountbank', 'AccountBank', 'Deposit.accountbankId IS NOT NULL')
            .leftJoinAndSelect('Customer.agent', 'Agent', 'Customer.agentId IS NOT NULL')
            .leftJoinAndSelect('AccountBank.banktype', 'Banktype', 'AccountBank.banktypeId IS NOT NULL')
        if (query.accountId && !isNaN(Number(query.accountId))) {
            await getData.andWhere('AccountBank.id = :accountId', {accountId: Number(query.accountId)})
        }
        if (query.banktypeId && !isNaN(Number(query.banktypeId))) {
            await getData.andWhere('Banktype.id = :banktypeId', {banktypeId: Number(query.banktypeId)})
        }
        if ((query.customerId && !isNaN(Number(query.customerId))) || payload.role === 'customer') {
            const customerId = payload.role === 'customer' ? Number(payload.id) : Number(query.customerId)
            await getData.andWhere('Customer.id = :customerId', {customerId: customerId})
        }
        if ((query.agentId && !isNaN(Number(query.agentId))) || payload.role === 'agent') {
            const agentId = payload.role === 'agent' ? Number(payload.id) : Number(payload.id)
            await getData.andWhere('Agent.id = :agentId', {agentId: agentId})
        }
        if (query.status) {
            await getData.andWhere('Deposit.status = :status', {status: query.status})
        }
        if (query.price && !isNaN(query.price)) {
            await getData.andWhere('Deposit.price >= :price', {price: Number(query.price)})
        }
        if (query.orderid) {
            await getData.andWhere('Deposit.orderid LIKE :orderId', {orderId: `%${query.orderid}%`})
        }
        const regEx = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
        if ((query.from_create && regEx.test(query.from_create)) && (query.to_create && regEx.test(query.to_create))) {
            const startDate = moment(query.from_create + ' 00:00:00', 'YYYY-MM-DD HH:mm:ss');
            const endDate = moment(query.to_create + ' 23:59:59', 'YYYY-MM-DD HH:mm:ss');
            if (startDate.isValid() && endDate.isValid()) {
                await getData.andWhere('Deposit.createdAt >= :startdate_create', {startdate_create: startDate.toDate()});
                await getData.andWhere('Deposit.createdAt <= :enddate_create', {enddate_create: endDate.toDate()});
            }
        }
        if ((query.from_update && regEx.test(query.from_update)) && (query.to_update && regEx.test(query.to_update))) {
            const startDate = moment(query.from_update + ' 00:00:00', 'YYYY-MM-DD HH:mm:ss');
            const endDate = moment(query.to_update + ' 23:59:59', 'YYYY-MM-DD HH:mm:ss');
            if (startDate.isValid() && endDate.isValid()) {
                await getData.andWhere('Deposit.updatedAt >= :startdate_update', {startdate_update: startDate.toDate()});
                await getData.andWhere('Deposit.updatedAt <= :enddate_update', {enddate_update: endDate.toDate()});
            }
        }
        await getData.limit(rows)
        await getData.offset(skip)
        await getData.orderBy('Deposit.createdAt', 'DESC')

        return {
            count: await getData.getCount(),
            data: (await getData.getMany()).map(value => {
                return {
                    id: value.id,
                    account: value.accountbank ? value.accountbank.account : null,
                    bank: value.accountbank && value.accountbank.banktype ? value.accountbank.banktype.key : null,
                    customer: value.customer ? {id: value.customer.id, name: value.customer.name} : null,
                    orderid: value.orderid,
                    qrcode: value.qrcode,
                    price: value.price,
                    mdr: (value.price * value.mdr) / 100,
                    from_account: value.fromAccount ? value.fromAccount : '',
                    from_bank: value.fromBank ? value.fromBank : '',
                    from_name: value.fromName ? value.fromName : '',
                    status: value.status,
                    createdAt: moment(value.createdAt).toDate(),
                    updatedAt: moment(value.updatedAt).toDate()
                }
            })
        }
    }

    async exportDataDeposit(payload, email, query, id): Promise<void> {
        const getData = await this.databaseService.depositRepository.createQueryBuilder('Deposit')
            .leftJoinAndSelect('Deposit.customer', 'Customer', 'Deposit.customerId IS NOT NULL')
            .leftJoinAndSelect('Deposit.accountbank', 'AccountBank', 'Deposit.accountbankId IS NOT NULL')
            .leftJoinAndSelect('AccountBank.banktype', 'Banktype', 'AccountBank.banktypeId IS NOT NULL')
        if (query.accountId && !isNaN(Number(query.accountId))) {
            await getData.andWhere('AccountBank.id = :accountId', {accountId: Number(query.accountId)})
        }
        if (query.banktypeId && !isNaN(Number(query.banktypeId))) {
            await getData.andWhere('Banktype.id = :banktypeId', {banktypeId: Number(query.banktypeId)})
        }
        if ((query.customerId && !isNaN(Number(query.customerId))) || payload.role === 'customer') {
            const customerId = payload.role === 'customer' ? Number(payload.id) : Number(query.customerId)
            await getData.andWhere('Customer.id = :customerId', {customerId: customerId})
        }
        if ((query.agentId && !isNaN(Number(query.agentId))) || payload.role === 'agent') {
            const agentId = payload.role === 'agent' ? Number(payload.id) : Number(query.agentId)
            await getData.andWhere('Customer.agentId = :agentId', {agentId: agentId})
        }
        if (query.status) {
            await getData.andWhere('Deposit.status = :status', {status: query.status})
        }
        if (query.price && !isNaN(query.price)) {
            await getData.andWhere('Deposit.price >= :price', {price: Number(query.price)})
        }
        if (query.orderid) {
            await getData.andWhere('Deposit.orderid LIKE :orderId', {orderId: `%${query.orderid}%`})
        }
        const regEx = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
        if ((query.from_create && regEx.test(query.from_create)) && (query.to_create && regEx.test(query.to_create))) {
            const startDate = moment(query.from_create + ' 00:00:00', 'YYYY-MM-DD HH:mm:ss');
            const endDate = moment(query.to_create + ' 23:59:59', 'YYYY-MM-DD HH:mm:ss');
            if (startDate.isValid() && endDate.isValid()) {
                await getData.andWhere('Deposit.createdAt >= :startdate_create', {startdate_create: startDate.toDate()});
                await getData.andWhere('Deposit.createdAt <= :enddate_create', {enddate_create: endDate.toDate()});
            }
        }
        if ((query.from_update && regEx.test(query.from_update)) && (query.to_update && regEx.test(query.to_update))) {
            const startDate = moment(query.from_update + ' 00:00:00', 'YYYY-MM-DD HH:mm:ss');
            const endDate = moment(query.to_update + ' 23:59:59', 'YYYY-MM-DD HH:mm:ss');
            if (startDate.isValid() && endDate.isValid()) {
                await getData.andWhere('Deposit.updatedAt >= :startdate_update', {startdate_update: startDate.toDate()});
                await getData.andWhere('Deposit.updatedAt <= :enddate_update', {enddate_update: endDate.toDate()});
            }
        }
        const ResultData = []
        let TotalAmount = 0
        let TotalMdr = 0
        let Order = 0
        for (const x of await getData.getMany()) {
            const model = {
                id: x.id,
                account: x.accountbank ? x.accountbank.account : null,
                bank: x.accountbank && x.accountbank.banktype ? x.accountbank.banktype.key : null,
                customer: x.customer ? x.customer.name : null,
                orderid: x.orderid,
                qrcode: x.qrcode,
                price: x.price.toFixed(2),
                mdr: ((x.price * x.mdr) / 100).toFixed(2),
                from_account: x.fromAccount ? x.fromAccount : '',
                from_bank: x.fromBank ? x.fromBank : '',
                status: x.status,
                createdAt: moment(x.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: moment(x.updatedAt).format('YYYY-MM-DD HH:mm:ss')
            }
            ResultData.push(model)
            Order += 1
            TotalAmount += x.price
            TotalMdr += ((x.price * x.mdr) / 100)
        }
        const json2csvParser = new Parser({withBOM: true});
        const csv = json2csvParser.parse(ResultData);
        const MessageOptionsEmail = {
            to: email,
            subject: `Export Deposit ${id}`,
            html: `<b>Count Order = ${Order}<br>TotalAmount = ${TotalAmount.toFixed(2)}<br>TotalMdr = ${TotalMdr.toFixed(2)}<br>TotalNetAmount = ${(TotalAmount - TotalMdr).toFixed(2)}</b>`,
            attachments: [
                {
                    filename: `ExportDeposit${id}.csv`,
                    content: Buffer.from(csv, 'utf-8')
                }
            ]
        }
        await this.emailService.sendEmail(MessageOptionsEmail)
    }

    async createDepositQrcode(payload, customer, account, orderid, price, comment: string = null, callback: string = null, sendcallback: boolean = true, randomSatang: boolean = true, returnPage: string = null) {
        const modelAdd = {
            customerId: customer,
            accountbankId: account,
            token: uuidv4(),
            orderid: orderid,
            price: randomSatang ? await this.shareService.banktransferSerivce.calculate.findPriceSatang(customer, account, price) : price,
            realPrice: price,
            status: 'wait',
            qrcode: true,
            returnPage,
            callback,
            sendcallback
        }
        const create = await this.databaseService.depositRepository.create(modelAdd)
        const result = await this.databaseService.depositRepository.insert(create)
        const resultInsert = await this.databaseService.depositRepository.findOne(result.raw.insertId)
        this.shareService.saveLogOrder(payload, resultInsert, 'deposit', comment)
        this.shareService.webhookService.convertToMessage('deposit', result.raw.insertId, 'create')
        this.shareService.webSocketsSerivce.serviceWebbackoffice.emitSocketCreate('deposit', result.raw.insertId)
        return resultInsert
    }

    async createDepositTransfer(payload, customer, account, orderid, price, from, comment: string = null, callback: string = null, sendcallback: boolean = true, randomSatang: boolean = false, commentInOrder: string = null, returnPage: string = null) {
        const modelAdd = {
            customerId: customer,
            accountbankId: account,
            token: uuidv4(),
            orderid: orderid,
            price: randomSatang ? await this.shareService.banktransferSerivce.calculate.findPriceSatang(customer, account, price) : price,
            realPrice: price,
            status: 'wait',
            fromAccount: from.from_account ? from.from_account : null,
            fromBank: from.from_bank ? from.from_bank : null,
            fromName: from.from_name ? from.from_name : null,
            comment: commentInOrder,
            returnPage,
            callback,
            sendcallback
        }
        const create = await this.databaseService.depositRepository.create(modelAdd)
        const result = await this.databaseService.depositRepository.insert(create)
        const resultInsert = await this.databaseService.depositRepository.findOne(result.raw.insertId)
        this.shareService.saveLogOrder(payload, resultInsert, 'deposit', comment)
        this.shareService.webhookService.convertToMessage('deposit', result.raw.insertId, 'create')
        this.shareService.webSocketsSerivce.serviceWebbackoffice.emitSocketCreate('deposit', result.raw.insertId)
        return resultInsert
    }

    async updateDepositByAutoApp(id, comment: string) {
        const getData = await this.databaseService.depositRepository.findOne(id, {relations: ['customer']})
        const NewModel = {
            status: 'success',
            mdr: getData.qrcode ? getData.customer.mdrQrcode : getData.customer.mdrDeposit
        }
        await this.databaseService.depositRepository.update(getData.id, NewModel)
        await this.shareService.saveLogOrder({
            role: 'auto'
        }, {...getData, ...NewModel}, 'deposit', comment)
        this.shareService.webhookService.hookToCustomer(getData.id, 'deposit')
        this.shareService.webSocketsSerivce.serviceWebbackoffice.emitSocketsDepositUpdate(getData.id)
        this.shareService.webSocketsSerivce.servicePaymentPage.banktransferReal(getData.id)
    }


    async updateDepositByAuto(id, SmsId, comment: string = null) {
        const getData = await this.databaseService.depositRepository.findOne(id, {relations: ['customer']})
        const NewModel = {
            status: 'success',
            mdr: getData.customer.mdrQrcode
        }
        const Result = await this.databaseService.depositRepository.update(getData.id, NewModel)
        this.shareService.saveLogOrder({
            id: SmsId,
            role: 'autosms'
        }, {...getData, ...NewModel}, 'deposit', comment)
        this.shareService.webhookService.hookToCustomer(getData.id, 'deposit')
        this.shareService.webSocketsSerivce.serviceWebbackoffice.emitSocketsDepositUpdate(getData.id)
        this.shareService.webSocketsSerivce.servicePaymentPage.banktransferReal(getData.id)
    }

    async updateDepsoit(payload, id, status, comment: string = null) {
        const getData = await this.databaseService.depositRepository.findOne(id, {relations: ['customer', 'logsorders']})
        if (getData.logsorders.length > 0 && getData.logsorders[getData.logsorders.length - 1].status === status) {
            throw new BadRequestException({
                code: 400,
                message: 'You cannot update same last status'
            })
        }
        if ((payload.role === 'operation' && getData.status !== 'wait' && status !== 'edit') || payload.role === 'customer') {
            throw new BadRequestException({
                code: 400,
                message: 'You cannot update status'
            })
        }
        const NewModel = {
            status,
            mdr: status === 'cancel' || status === 'edit' || status === 'refund' ? 0 : getData.qrcode ? getData.customer.mdrQrcode : getData.customer.mdrDeposit
        }
        const Result = await this.databaseService.depositRepository.update(getData.id, NewModel)
        this.shareService.saveLogOrder(payload, {...getData, ...NewModel}, 'deposit', comment)
        if (status !== 'edit' && getData.sendCallback) {
            await this.shareService.webhookService.hookToCustomer(getData.id, 'deposit')
        }
        this.shareService.webSocketsSerivce.serviceWebbackoffice.emitSocketsDepositUpdate(getData.id)
        this.shareService.webSocketsSerivce.servicePaymentPage.banktransferReal(getData.id)
        return {
            ...getData,
            ...NewModel
        }
    }

    async updateDepositByAutoScbPinApp(depositId, dataScb) {
        const getDeposit = await this.databaseService.depositRepository.findOne({
            where: {
                id: depositId
            },
            relations: ['customer']
        })
        if (getDeposit) {
            const NewModel = {
                status: 'success',
                mdr: getDeposit.customer.mdrDeposit
            }
            const result = await this.databaseService.depositRepository.update(getDeposit.id, NewModel)
            this.shareService.saveLogOrder({
                role: 'auto',
                status: 'success'
            }, result, 'deposit', `${dataScb.txnRemark} ยอดเงิน ${dataScb.txnAmount} บาท เวลา ${moment(dataScb.txnDateTime).format('YYYY-MM-DD HH:mm:ss')}`)
            if (getDeposit.sendCallback) {
                await this.shareService.webhookService.hookToCustomer(result.raw.insertId, 'deposit')
            }
            this.shareService.webSocketsSerivce.serviceWebbackoffice.emitSocketsDepositUpdate(result.raw.insertId)
            this.shareService.webSocketsSerivce.servicePaymentPage.banktransferReal(result.raw.insertId)
        }
    }

    readQrcode(readImage) {
        return new Promise((resolve, reject) => {
            Jimp.read(readImage, function (err, image) {
                if (err) {
                    Logger.error(err);
                    reject(err)
                }
                let qrcode = new qrCode();
                qrcode.callback = function (err, value) {
                    if (err) {
                        Logger.error(err);
                    }
                    // console.log(value.result);
                    Logger.log(`${value ? value.result : value}`);
                    resolve(value)
                };
                // qrcode.decode(image.bitmap);
                qrcode.decode(image.bitmap);
            });
        })
    }

    async getDetailSlipByQrcode(token, qrcode) {
        const result = await this.shareService.getRequest({
            method: 'GET',
            uri: `${this.baseURLBanking}/bank/scb/scanqr`,
            headers: {
                'x-api-key': token
            },
            qs: {
                qrcode
            },
            json: true
        })
        return result.body
    }
}
