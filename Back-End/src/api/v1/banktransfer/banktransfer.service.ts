import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    Logger,
    UnauthorizedException
} from '@nestjs/common';
import {DatabaseService} from "../../../database/database.service";
import {ShareService} from "../../../share/share.service";
import * as moment from 'moment-timezone'
import * as qrcode from 'qrcode'
import * as promptpayQr from 'promptpay-qr'
import * as randtoken from 'rand-token'
import {CheckBalanceOutput} from "./dto/check-balance.output";
import {QueryDepositInput} from "./dto/query-deposit.input";
import {QueryDepositOutput} from "./dto/query-deposit.output";
import {CreateWithdrawInput} from "./dto/create-withdraw.input";
import {QueryWithdrawInput} from "./dto/query-withdraw.input";
import {QueryWithdrawOutput} from "./dto/query-withdraw.output";
import {CreateDepositTransferInput} from "./dto/create-deposit-transfer.input";
import {CreateDepositTransferOutput} from "./dto/create-deposit-transfer.output";
import {CreateWithdrawOutput} from "./dto/create-withdraw.output";
import {CreateDepositAutoqrcodeInput} from "./dto/create-deposit-autoqrcode.input";
import {CreateDepositAutoqrcodeOutput} from "./dto/create-deposit-autoqrcode.output";
import {IsNull, Not} from "typeorm";
import {UpdateDepositByslipbankInput} from "./dto/update-deposit-byslipbank.input";

@Injectable()
export class BanktransferService {
    constructor(
        private database: DatabaseService,
        private share: ShareService
    ) {
    }

    async checkBalance(authorization): Promise<CheckBalanceOutput> {
        if (!authorization) {
            throw new UnauthorizedException()
        }
        const getUser = await this.database.customerRepository.findOne({
            select: ['id'],
            where: {
                authApi: authorization
            }
        })
        if (!getUser) {
            throw new UnauthorizedException()
        }
        const getBalance = await this.share.banktransferSerivce.calculate.balanceCustomer(getUser.id)
        const resultData = {
            code: 200,
            nonce_str: randtoken.suid(16),
            balance: Number(getBalance.toFixed(2))
        }
        return {...resultData, signature: await this.share.encryptSignatureMD5(getUser.secertkey, resultData)}
    }

    async queryDeposit(body: QueryDepositInput, authorization): Promise<QueryDepositOutput> {
        if (!authorization) {
            throw new UnauthorizedException()
        }
        const getUser = await this.database.customerRepository.findOne({
            where: {
                authApi: authorization
            }
        })
        const getDeposit = await this.database.depositRepository.findOne({
            where: {
                orderid: body.orderid,
                token: body.id,
                customerId: getUser.id
            },
            relations: ['accountbank', 'accountbank.banktype']
        })

        if (!getDeposit) {
            throw new BadRequestException({
                code: 400,
                message: 'You have not order'
            })
        }

        const resultData = {
            code: 200,
            id: getDeposit.token,
            orderid: getDeposit.orderid,
            price: getDeposit.price,
            qrcode: getDeposit.qrcode ? true : false,
            status: getDeposit.status === 'edit' ? 'wait' : getDeposit.status,
            from_account: getDeposit.fromAccount,
            from_bank: getDeposit.fromBank,
            from_name: getDeposit.fromName,
            accountbank: getDeposit.accountbank ? {
                account: getDeposit.accountbank.account,
                name: getDeposit.accountbank.name,
                bank: getDeposit.accountbank.banktype ? getDeposit.accountbank.banktype.key : null
            } : null,
            created_at: moment(getDeposit.createdAt).toISOString(),
            updated_at: moment(getDeposit.updatedAt).toISOString()
        }

        return {...resultData, signature: await this.share.encryptSignatureMD5(getUser.secertkey, resultData)}

    }

    async queryWithdraw(body: QueryWithdrawInput, authorization): Promise<QueryWithdrawOutput> {
        if (!authorization) {
            throw new UnauthorizedException()
        }
        const getUser = await this.database.customerRepository.findOne({
            where: {
                authApi: authorization
            }
        })
        const getWithdraw = await this.database.withdrawRepository.findOne({
            where: {
                token: body.id,
                orderid: body.orderid,
                customerId: getUser.id
            }
        })
        if (!getWithdraw) {
            throw new BadRequestException({
                code: 400,
                message: 'You have not order'
            })
        }
        const resultData = {
            code: 200,
            id: getWithdraw.token,
            orderid: getWithdraw.orderid,
            account: getWithdraw.account,
            to_banking: getWithdraw.toBanking,
            name: getWithdraw.name,
            price: getWithdraw.price,
            status: getWithdraw.status === 'edit' ? 'wait' : getWithdraw.status,
            callback: getWithdraw.callback,
            created_at: moment(getWithdraw.createdAt).toISOString(),
            updated_at: moment(getWithdraw.updatedAt).toISOString()
        }
        return {...resultData, signature: await this.share.encryptSignatureMD5(getUser.secertkey, resultData)}
    }

    async createOrderDeposit(body: CreateDepositTransferInput, authorization): Promise<CreateDepositTransferOutput> {
        const realPrice = body.price / 100
        const getCustomer = await this.database.customerRepository.findOne({
            where: {
                authApi: authorization
            }
        })
        let getAccount = await this.share.banktransferSerivce.accountbank.getAccountCustomer(getCustomer, false)
        getAccount = body.account ? getAccount : body.from_bank === 'KBANK' && getAccount.findIndex(value => value.banktype && value.banktype.key === 'KBANK') >= 0 ? getAccount.filter(value => value.banktype && value.banktype.key === 'KBANK') : getAccount.filter(value => value.banktype && value.banktype.key === 'SCB')
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
        let use_account = await getAccount[findIndex]
        const payload = {
            role: 'customer',
            id: getCustomer.id
        }
        const from = {
            from_account: body.from_account ? body.from_account : null,
            from_bank: body.from_bank ? body.from_bank : null,
            from_name: body.from_name ? body.from_name : null
        }

        const result = await this.share.banktransferSerivce.deposit.createDepositTransfer(payload, getCustomer.id, use_account.id, body.orderid, realPrice, from, 'Create On API', body.callback, true, body.random_satang, null, body.return_page)

        const res_result = {
            code: 200,
            id: result.token,
            orderid: result.orderid,
            redirect_url: `${this.share.configService.get<string>('redirectURL')}/bt?token=${result.token}`,
        }

        return {
            ...res_result,
            signature: await this.share.encryptSignatureMD5(getCustomer.secertkey, res_result)
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
            id: getCustomer.id
        }
        const from = {
            account: body.account,
            to_banking: body.to_banking,
            name: body.name
        }
        const result = await this.share.banktransferSerivce.withdraw.createWithdraw(payload, getCustomer.id, body.orderid, realPrice, from, 'Create On API', body.callback, true)

        const res_result = {
            code: 200,
            id: result.token,
            orderid: result.orderid
        }


        return {
            ...res_result,
            signature: await this.share.encryptSignatureMD5(getCustomer.secertkey, res_result)
        }
    }

    async createOrderDepositQRcode(body: CreateDepositAutoqrcodeInput, authorization): Promise<CreateDepositAutoqrcodeOutput> {
        const realPrice = body.price / 100
        const getCustomer = await this.database.customerRepository.findOne({
            where: {
                authApi: authorization
            }
        })
        let getAccount = await this.share.banktransferSerivce.accountbank.getAccountCustomer(getCustomer, true)
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
            id: getCustomer.id
        }
        const result = await this.share.banktransferSerivce.deposit.createDepositQrcode(payload, getCustomer.id, use_account.id, body.orderid, realPrice, 'Create On API', body.callback, true, body.random_satang, body.return_page)
        if (body.from_account || body.from_bank || body.from_name) {
            await this.database.depositRepository.update(result.id, {
                fromAccount: body.from_account,
                fromBank: body.from_bank,
                fromName: body.from_name
            })
        }
        Logger.debug(JSON.stringify(result))
        const Timeout = moment(result.createdAt).add(15, 'minutes')
        const res_result = {
            code: 200,
            id: result.token,
            orderid: result.orderid,
            price: parseInt(parseFloat(String(result.price * 100)).toPrecision(12)),
            image: `${this.share.configService.get<string>('baseURL')}/api/v1/image/qrcode?token=${result.token}`,
            redirect_url: `${this.share.configService.get<string>('redirectURL')}/bt?token=${result.token}`,
            timeout: {
                days: Timeout.format('DD/MM/YYYY'),
                time: Timeout.format('HH:mm:ss'),
                iso: Timeout.toDate()
            }
        }

        return {
            ...res_result,
            signature: await this.share.encryptSignatureMD5(getCustomer.secertkey, res_result)
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


    async verifyDepositSlipByUrl(body: UpdateDepositByslipbankInput, authorization) {
        const getCustomer = await this.database.customerRepository.findOne({
            select: ['id', "mdrDeposit", "mdrQrcode"],
            where: {
                authApi: authorization
            }
        })
        const getDeposit = await this.database.depositRepository.findOne({
            select: ['id', 'status', 'accountbankId', "qrcode", "fromAccount", "fromBank", "fromName"],
            where: {
                token: body.id,
                orderid: body.orderid,
                customerId: getCustomer.id
            }
        })
        if (!getDeposit) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have order'
            })
        }
        if (getDeposit.status === 'success') {
            throw new BadRequestException({
                code: 400,
                message: 'You cannot update status'
            })
        }
        let getBuffer = null
        try {
            getBuffer = await this.share.getRequest({
                method: 'GET',
                url: body.url_slip,
                encoding: null
            })
        } catch (e) {
            throw new BadRequestException({
                code: 400,
                message: 'Error url slip'
            })
        }
        let checkQrSlip = null
        try {
            checkQrSlip = await this.share.banktransferSerivce.deposit.readQrcode(getBuffer.body)
        } catch (e) {
            throw new BadRequestException({
                code: 400,
                message: 'Error image not have qrcode'
            })
        }
        const getAccount = await this.database.accountbankRepository.findAndCount({
            select: ['tokenCommand'],
            where: {
                tokenCommand: Not(IsNull()),
                banktypeId: 8
            }
        })
        if (getAccount[1] === 0) {
            throw new InternalServerErrorException({
                code: 500,
                message: 'System check slip bank'
            })
        }
        const randomUseAccount = Math.floor(Math.random() * getAccount[0].length)
        const getResult = await this.share.banktransferSerivce.deposit.getDetailSlipByQrcode(getAccount[0][randomUseAccount].tokenCommand, checkQrSlip.result)
        if (getResult.code && getResult.code === 502) {
            throw new InternalServerErrorException({
                code: 500,
                message: 'Error server banking'
            })
        }
        const accountSender = getResult.sender.account.replace(/x/g, '').replace(/X/g, '').replace(/-/g, '')
        if (getDeposit.qrcode && getDeposit.price === getResult.amount) {
            this.share.banktransferSerivce.deposit.updateDepositByAutoApp(getDeposit.id, `Update by slip bank ${body.url_slip}`)
        } else if (getResult.sender && getDeposit.fromAccount.indexOf(accountSender) >= 0 && getDeposit.fromBank === getResult.sender.bank) {
            this.share.banktransferSerivce.deposit.updateDepositByAutoApp(getDeposit.id, `Update by slip bank ${body.url_slip}`)
        }
        return {
            update: true
        }
    }

}
