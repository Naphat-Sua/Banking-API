import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {DatabaseService} from "../database/database.service";
import * as moment from "moment-timezone";
import * as qrcode from 'qrcode'
import * as promptpayQr from 'promptpay-qr'
import {ShareService} from "../share/share.service";

@Injectable()
export class PaymentpageService {
    constructor(
        private databaseService: DatabaseService,
        private shareService: ShareService
    ) {
    }

    async getQuery(token) {
        const getData = await this.databaseService.depositRepository.findOne({
            where: {
                token
            },
            relations: ['customer', 'accountbank', 'accountbank.banktype']
        })
        if (!getData) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have token'
            })
        }

        return {
            id: getData.id,
            token: getData.token,
            orderid: getData.orderid,
            status: getData.status,
            customer: getData.customer ? getData.customer.name : null,
            verify_identity: getData.customer ? getData.customer.name.indexOf('gofx') >= 0 ? true : false : false,
            price: getData.price,
            qrcode: getData.qrcode,
            from_bank: getData.fromBank,
            from_bank_account: getData.fromAccount,
            from_bank_name: getData.fromName,
            return_page: getData.returnPage,
            image_qrcode: getData.qrcode ? `${this.shareService.configService.get<string>('baseURL')}/paymentpage/image/qrcode?token=${getData.token}` : null,
            accountbank: getData.accountbank ? {
                account: getData.accountbank.account,
                name: getData.accountbank.name,
                type: getData.accountbank.banktype ? getData.accountbank.banktype.key : null
            } : null
        }
    }

    async updateBank(token: string, body) {
        const getDeposit = await this.databaseService.depositRepository.findOne({
            where: {
                token
            }
        })
        if (!getDeposit) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have token'
            })
        }
        await this.databaseService.depositRepository.update(getDeposit.id, {
            fromBank: body.bank.toUpperCase(),
            fromName: body.bank_name,
            fromAccount: body.bank_account
        })

        await this.shareService.webSocketsSerivce.serviceWebbackoffice.emitSocketsDepositUpdate(getDeposit.id)
        return {
            update: true
        }
    }

    async genImageQRcode(token) {
        const getData = await this.databaseService.depositRepository.findOne({
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
