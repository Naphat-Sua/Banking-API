import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {DatabaseService} from "../../database/database.service";
import {ShareService} from "../../share/share.service";
import * as moment from "moment-timezone";
import * as qrcode from 'qrcode'
import * as promptpayQr from 'promptpay-qr'
import {CreateDepositTransferInput} from "./dto/create-deposit-transfer.input";
import {CreateDepositTransferOutput} from "./dto/create-deposit-transfer.output";
import {CreateWithdrawInput} from "./dto/create-withdraw.input";
import {CreateWithdrawOutput} from "./dto/create-withdraw.output";
import {CreateDepositAutoqrcodeInput} from "./dto/create-deposit-autoqrcode.input";
import {CreateDepositAutoqrcodeOutput} from "./dto/create-deposit-autoqrcode.output";

@Injectable()
export class IndexService {
    constructor(
        private database: DatabaseService,
        private share: ShareService
    ) {
    }


    async createOrderDeposit(body: CreateDepositTransferInput, authorization): Promise<CreateDepositTransferOutput> {
        const realPrice = body.price / 100
        const getCustomer = await this.database.customerRepository.findOne({
            where: {
                authApi: authorization
            }
        })
        const getAccount = await this.share.banktransferSerivce.accountbank.getAccountCustomer(getCustomer, false)
        if (getAccount.length === 0) {
            throw new BadRequestException({
                code: 400,
                message: 'You have not account bank'
            })
        }
        const checkOrderId = await this.database.depositRepository.findOne({
            where: {
                customerId: getCustomer.id,
                orderid: body.orderid
            }
        })
        if (checkOrderId) {
            throw new BadRequestException({
                code: 400,
                message: 'You cannot use orderid'
            })
        }
        let findIndex = body.account ? await getAccount.findIndex(value => value.account === body.account) : -1
        if (findIndex < 0) {
            findIndex = Math.floor(Math.random() * getAccount.length)
        }
        const use_account = await getAccount[findIndex]
        const payload = {
            role: 'customer',
            customerId: getCustomer.id
        }
        const from = {
            from_account: body.from_account ? body.from_account : null,
            from_bank: body.from_bank ? body.from_bank : null,
            from_name: body.from_name ? body.from_name : null
        }
        const result = await this.share.banktransferSerivce.deposit.createDepositTransfer(payload, getCustomer.id, use_account.id, body.orderid, realPrice, from, 'Create On API')

        return {
            code: 200,
            id: result.token,
            orderid: result.orderid,
            redirect_url: `${this.share.configService.get<string>('redirectURL')}/bt?token=${result.token}`,
        }

    }


    async createOrderWithdraw(body: CreateWithdrawInput, authorization): Promise<CreateWithdrawOutput> {
        const realPrice = body.price / 100
        const getCustomer = await this.database.customerRepository.findOne({
            where: {
                authApi: authorization
            }
        })
        const balance = await this.share.banktransferSerivce.calculate.balanceCustomer(getCustomer.id)

        if (realPrice > balance) {
            throw new BadRequestException({
                code: 400,
                message: `You don't have enough available funds to withdraw.`
            })
        }
        const payload = {
            role: 'customer',
            customerId: getCustomer.id
        }
        const from = {
            account: body.account,
            to_banking: body.to_banking,
            name: body.name
        }
        const result = await this.share.banktransferSerivce.withdraw.createWithdraw(payload, getCustomer.id, body.orderid, realPrice, from, 'Create On API')

        return {
            code: 200,
            id: result.token,
            orderid: result.orderid
        }

    }


    async createOrderDepositQrcode(body: CreateDepositAutoqrcodeInput, authorization): Promise<CreateDepositAutoqrcodeOutput> {
        const realPrice = body.price / 100
        const getCustomer = await this.database.customerRepository.findOne({
            where: {
                authApi: authorization
            }
        })
        const getAccount = await this.share.banktransferSerivce.accountbank.getAccountCustomer(getCustomer, true)
        if (getAccount.length === 0) {
            throw new BadRequestException({
                code: 400,
                message: 'You have not account bank'
            })
        }
        const checkOrderId = await this.database.depositRepository.findOne({
            where: {
                customerId: getCustomer.id,
                orderid: body.orderid
            }
        })
        if (checkOrderId) {
            throw new BadRequestException({
                code: 400,
                message: 'You cannot use orderid'
            })
        }
        let findIndex = body.account ? await getAccount.findIndex(value => value.account === body.account) : -1
        if (findIndex < 0) {
            findIndex = Math.floor(Math.random() * getAccount.length)
        }
        const use_account = await getAccount[findIndex]
        const payload = {
            role: 'customer',
            customerId: getCustomer.id
        }
        const result = await this.share.banktransferSerivce.deposit.createDepositQrcode(payload, getCustomer.id, use_account.id, body.orderid, realPrice, 'Create On API')
        const Timeout = moment(result.createdAt).add(15, 'minutes')
        return {
            code: 200,
            id: result.token,
            orderid: result.orderid,
            price: result.price * 100,
            image: `${this.share.configService.get<string>('baseURL')}/api/image/qrcode?token=${result.token}`,
            images: `${this.share.configService.get<string>('baseURL')}/api/image/qrcode?token=${result.token}`,
            redirect_url: `${this.share.configService.get<string>('redirectURL')}/bt?token=${result.token}`,
            timeout: {
                days: Timeout.format('DD/MM/YYYY'),
                time: Timeout.format('HH:mm:ss'),
                iso: Timeout.toDate()
            }
        }
    }

    async genImageQRcode(token) {
        const getData = await this.database.depositRepository.findOne({
            where: {
                token
            },
            relations: ['accountbank']
        })
        if (!getData || (getData && getData.accountbank && !getData.accountbank.promptpay)) {
            throw new BadRequestException({
                code: 400,
                message: 'System can not gen image qrcode'
            })
        }
        const Timeout = moment(getData.createdAt).add(15, 'minutes')
        if (!moment().isBetween(getData.createdAt, Timeout)) {
            throw new BadRequestException({
                code: 500,
                message: 'QRcode Timeout'
            })
        }
        let promptpayNumber = null
        if (getData.accountbank.promptpay.length == 10) {
            const promptpay = getData.accountbank.promptpay
            const phone = promptpay.slice(0, 3) + '-' + promptpay.slice(3, 6) + '-' + promptpay.slice(6, 10)
            promptpayNumber = promptpayQr(phone, {amount: getData.price})
        }
        if (getData.accountbank.promptpay.length == 13) {
            const promptpay = getData.accountbank.promptpay
            const idCard = promptpay.slice(0, 1) + '-' + promptpay.slice(1, 5) + '-' + promptpay.slice(5, 10) + '-' + promptpay.slice(10, 12) + '-' + promptpay.slice(12, 13)
            promptpayNumber = promptpayQr(idCard, {amount: getData.price})
        }
        if (!promptpayNumber) {
            throw new InternalServerErrorException({
                code: 500,
                message: 'Promptpay number problem'
            })
        }
        const QRcode = await qrcode.toDataURL(promptpayNumber)
        const cutBase64 = await QRcode.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
        const Image = new Buffer(cutBase64[2], 'base64')
        return Image

    }


}
