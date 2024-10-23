import {forwardRef, Inject, Injectable, Logger, OnModuleInit} from '@nestjs/common';
import * as request from 'request'
import * as crypto from 'crypto'
import {DatabaseService} from "../database/database.service";
import * as moment from "moment-timezone";
import * as fs from "fs";
import rootPath from "../rootPath";
import {ShareService} from "../share/share.service";
import {McpaymentDatabaseService} from "../mcpayment-database/mcpayment-database.service";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class WebhookService implements OnModuleInit {
    private whiteListProxyIp: string[]
    private errorReturn: []
    private proxyIp: string[]
    private urlDiscord: string

    constructor(
        private mcpaymentDb: McpaymentDatabaseService,
        private databaseService: DatabaseService,
        @Inject(forwardRef(() => ShareService))
        private shareService: ShareService,
        private configService: ConfigService
    ) {
        this.whiteListProxyIp = this.configService.get<string>('whitelist_ip') ? this.configService.get<string>('whitelist_ip').split(',') : []
        this.errorReturn = []
        this.urlDiscord = this.configService.get<string>('discordkey')
    }

    onModuleInit(): any {
        //this.setProxyIp()
    }

    async setProxyIp() {
        //const getProxyIp = await this.shareService.proxyipService.getProxy()
        //this.proxyIp = getProxyIp
    }

    async hookToLineNotify(token, message): Promise<void> {
        const getProxyIp = this.proxyIp.length > 0 ? this.proxyIp : null
        const randomNum = Math.floor(Math.random() * getProxyIp.length)
        const randomIp = getProxyIp[randomNum]
        Logger.debug(`Use proxy ${randomIp} (hookToLineNotify)`)
        request({
            url: 'https://notify-api.line.me/api/notify',
            method: 'POST',
            proxy: randomIp,
            headers: {
                Authorization: `Bearer ${token}`
            },
            form: {
                message: message
            }
        }, function (err, resp, body) {
            if (err) {
                Logger.debug(err)
            }
            if (resp.statusCode == 200) {
                Logger.debug(`LineNotify statusCode ${resp.statusCode}`)
            }
            if (body) {
                Logger.debug(body)
            }
        })
    }

    async hookToDiscord(id, message): Promise<void> {
        if (this.urlDiscord) {
            request({
                url: this.urlDiscord,
                method: 'POST',
                body: {
                    id,
                    message
                },
                json: true
            }, (err, resp, body) => {
                if (err) {
                    Logger.debug(err)
                }
                if (resp.statusCode == 200) {
                    Logger.debug(`Discord hook statusCode ${resp.statusCode}`)
                }
                if (body) {
                    Logger.debug(body)
                }
            })
        }
    }

    async writeFileLogWebhook(options, err, resp, body) {
        const days = moment().format('YYYY-MM-DD')
        const readDir = await fs.readdirSync(`${rootPath}/LogsCallbackWebhook`)
        const checkFile = await readDir.findIndex(value => value === `${days}.txt`)
        const data = {
            timedays: moment().format('YYYY-MM-DD HH:mm:ss'),
            request: {
                ...options
            },
            response: resp ? {
                headers: resp.headers,
                status: resp.statusCode,
                body
            } : null,
            error: err ? err.message : null
        }
        if (checkFile < 0) {
            await fs.writeFileSync(`${rootPath}/LogsCallbackWebhook/${days}.txt`, `${JSON.stringify(data)}\n`, {encoding: 'utf-8'})
        } else {
            await fs.appendFileSync(`${rootPath}/LogsCallbackWebhook/${days}.txt`, `${JSON.stringify(data)}\n`, {encoding: "utf-8"})
        }
    }

    async AllNotify(message) {
        const getAllNotify = await this.databaseService.allnotificationRepository.find({
            relations: ['type']
        })
        for (const x of getAllNotify) {
            if (x.type && x.type.type === 'linenotify') {
                await this.hookToLineNotify(x.key, message)
            }
            if (x.type && x.type.type === 'discord') {
                await this.hookToDiscord(x.key, message)
            }
        }
    }

    async NotifyByCustomer(message, customer) {
        const getNotify = await this.databaseService.notifiationRepository.find({
            where: {
                customerId: customer
            },
            relations: ['type']
        })
        for (const x of getNotify) {
            if (x.type && x.type.type === 'linenotify') {
                await this.hookToLineNotify(x.key, message)
            }
            if (x.type && x.type.type === 'discord') {
                await this.hookToDiscord(x.key, message)
            }
        }
    }

    async convertToMessage(type, id, status) {
        if (type === 'deposit') {
            let message = status === 'update' ? 'อัพเดทสถานะ Deposit' : status === 'create' ? 'รายกายใหม่ Deposit' : ''
            message += '\r\n'
            const getData = await this.databaseService.depositRepository.findOne(id, {relations: ['customer', 'accountbank']})
            if (getData && getData.customer) {
                message += `ID: ${getData.id}\r\n`
                message += `Token: ${getData.token}\r\n`
                message += `Customer: ${getData.customer ? getData.customer.username : 'ไม่มีข้อมูลในระบบ'}\r\n`
                message += `OrderID: ${getData.orderid}\r\n`
                message += `Price: ${getData.price}\r\n`
                message += `Type: ${getData.qrcode ? 'QRcode' : 'BankTransfer'}\r\n`
                if (!getData.qrcode) {
                    message += `From Account: ${getData.fromAccount ? getData.fromAccount : 'Not have'}\r\n`
                    message += `From Bank: ${getData.fromBank ? getData.fromBank : 'Not have'}\r\n`
                    message += `From Name: ${getData.fromName ? getData.fromName : 'Not have'}\r\n`
                }
                message += `Status: ${getData.status}\r\n`
                if (getData.comment) {
                    message += `Commnet: ${getData.comment}`
                }
                await this.AllNotify(message)
                await this.NotifyByCustomer(message, getData.customer.id)
            }

        }
        if (type === 'withdraw') {
            let message = status === 'update' ? 'อัพเดทสถานะ Withdraw' : status === 'create' ? 'รายกายใหม่ Withdraw' : ''
            message += '\r\n'
            const getData = await this.databaseService.withdrawRepository.findOne(id, {relations: ['customer']})
            if (getData && getData.customer) {
                message += `ID: ${getData.id}\r\n`
                message += `Customer: ${getData.customer ? getData.customer.username : 'ไม่มีข้อมูลในระบบ'}\r\n`
                message += `OrderID: ${getData.orderid}\r\n`
                message += `Price: ${getData.price}\r\n`
                message += `Account: ${getData.account}\r\n`
                message += `To Bank: ${getData.toBanking}\r\n`
                message += `Name: ${getData.name}\r\n`
                message += `Status: ${getData.status}\r\n`
                await this.AllNotify(message)
                await this.NotifyByCustomer(message, getData.customer.id)
            }
        }
        if (type === 'settlement') {
            let message = status === 'update' ? 'อัพเดทสถานะ Settlement' : status === 'create' ? 'รายกายใหม่ Settlement' : ''
            message += '\r\n'
            const getData = await this.databaseService.settlementRepository.findOne(id, {relations: ['customer']})
            if (getData && getData.customer) {
                message += `ID: ${getData.id}\r\n`
                message += `Customer: ${getData.customer ? getData.customer.username : 'ไม่มีข้อมูลในระบบ'}\r\n`
                message += `OrderID: ${getData.orderid}\r\n`
                message += `Price: ${getData.price}\r\n`
                message += `Account: ${getData.bankaccount}\r\n`
                message += `To Bank: ${getData.banktype ? getData.banktype.key : 'ไม่ตรงกับธนาคารในระบบ'}\r\n`
                message += `Name: ${getData.bankname}\r\n`
                message += `Status: ${getData.status}\r\n`
                await this.AllNotify(message)
                await this.NotifyByCustomer(message, getData.customer.id)
            }
        }
    }

    async hookToCustomerMcPayment(orderid): Promise<void> {
        const getData = await this.mcpaymentDb.order.findOne({
            where: {
                id: orderid
            },
            relations: ['customer'],
            withDeleted: true
        })
        if (getData && getData.statusUrl) {
            const modelData = {
                type: getData.typePayment,
                id: getData.token,
                orderid: getData.orderid,
                status: getData.status
            }
            const signature = this.Encrypt(getData.customer.secertkey, modelData)
            this.requestToCustomer(getData.statusUrl, {...modelData, signature})
        }
    }

    async notifyFromMcPayment(orderid) {
        const getData = await this.mcpaymentDb.order.findOne({
            where: {
                id: orderid
            },
            relations: ['merchant', 'customer', 'mcpaymentCallbacks'],
        })
        if (getData) {
            let msg = `${getData.status === 'wait' ? 'รายการใหม่ McPayment' : 'อัพเดทสถานะ McPayment'}\r\n`
            msg += `ID: ${getData.id}\r\n`
            msg += `MID: ${getData.merchant ? getData.merchant.mid : 'ไม่พบข้อมูล'}\r\n`
            if (getData.mcpaymentCallbacks.length > 0 && getData.mcpaymentCallbacks[getData.mcpaymentCallbacks.length - 1]) {
                const subDataCallback = getData.mcpaymentCallbacks[getData.mcpaymentCallbacks.length - 1]
                if (subDataCallback.transid) {
                    msg += `TransId: ${subDataCallback.transid}\r\n`
                }
                if (subDataCallback.cardno) {
                    msg += `Card: ${subDataCallback.cardno}\r\n`
                }
                if (subDataCallback.cardco) {
                    msg += `TypeCard: ${subDataCallback.cardco}\r\n`
                }
                if (subDataCallback.cardname) {
                    msg += `CardName: ${subDataCallback.cardname}\r\n`
                }
            }
            msg += `ENV: ${getData.merchant ? getData.merchant.typeEnv : 'ไม่พบข้อมูล'}\r\n`
            msg += `Token ${getData.token}\r\n`
            msg += `Customer: ${getData.customer ? getData.customer.name : 'ไม่พบข้อมูล'}\r\n`
            msg += `OrderId: ${getData.orderid}\r\n`
            msg += `TypePay: ${getData.typePayment}\r\n`
            msg += `Price: ${getData.amount}\r\n`
            msg += `Currency: ${getData.currency}\r\n`
            msg += `Status: ${getData.status}\r\n`
            this.AllNotify(msg)
            this.hookToLineNotify('qPcuO8SJkPb6xpkB4VN3rAFEARk3wwGFCW7MjxK2SHB', msg)
            this.NotifyByCustomer(msg, getData.customer.mainId)
        }
    }

    async notifyWithdrawFromMcPayment(id) {
        const getData = await this.mcpaymentDb.withdraw.findOne({
            where: {
                id
            },
            relations: ['customer']
        })
        if (getData) {
            let msg = `รายการ Withdraw`
            msg += `ID: ${getData.id}\r\n`
            msg += `Token: ${getData.token}\r\n`
            msg += `Customer: ${getData.customer ? getData.customer.name : 'ไม่พบข้อมูล'}\r\n`
            msg += `OrderId: ${getData.orderid}\r\n`
            msg += `Price: ${getData.amount}\r\n`
            msg += `Currency: ${getData.currency}\r\n`
            this.AllNotify(msg)
            this.hookToLineNotify('qPcuO8SJkPb6xpkB4VN3rAFEARk3wwGFCW7MjxK2SHB', msg)
        }
    }

    async requestToCustomer(url, rbody, wishlistip: boolean = false): Promise<void> {
        const getProxyIp = wishlistip ? this.whiteListProxyIp : this.proxyIp.length > 0 ? this.proxyIp : null
        const randomNum = getProxyIp && getProxyIp.length > 0 ? Math.floor(Math.random() * getProxyIp.length) : -1
        const randomIp = randomNum >= 0 ? getProxyIp[randomNum] : null
        Logger.debug(`Use proxy ${randomIp} (requestToCustomer)`)
        const options = {
            url: url,
            method: 'POST',
            body: rbody,
            proxy: randomIp,
            json: true
        }
        const sendDataToWriteFileLog = (err, resp, body) => this.writeFileLogWebhook(options, err, resp, body)
        const errorRequest = (message) => {
            this.handleErrorRequest(url, rbody, wishlistip, message)
        }
        const removeError = () => {
            this.removeErrorRequest(url, rbody)
        }
        request(options, function (err, resp, body) {
            if (err) {
                Logger.debug(`Error Callback Message ${err.message}`)
                let messageHook = `เกิดข้อผิดพลาด\r\n`
                messageHook += `Type: ${rbody.type}\r\n`
                messageHook += `OrderId: ${rbody.orderid}\r\n`
                messageHook += `Status: ${rbody.status}\r\n`
                messageHook += `Message: ${err.message}`
                errorRequest(messageHook)
            }
            if (resp) {
                const message = `hook to customer ${url} statusCode ${resp.statusCode}`
                Logger.debug(message)
            }
            if (body) {
                Logger.debug(body)
                removeError()
            }
            if (resp) {
                const message = `hook to customer ${url} , method: POST , Body: ${JSON.stringify(rbody)} , statusCode ${resp.statusCode} , Response: ${body}`
                Logger.log(message)
            }
            sendDataToWriteFileLog(err, resp, body)
        })
    }

    async removeErrorRequest(url: string, rbody: any) {
        // @ts-ignore
        const findIndex = this.errorReturn.findIndex(value => value.url === url && (value.rbody && value.rbody.orderid === rbody.orderid && value.rbody.type === rbody.type && value.rbody.id === rbody.id))
        if (findIndex >= 0) {
            this.errorReturn.splice(findIndex, 1)
        }
    }

    async handleErrorRequest(url: string, rbody: any, wishlistip: boolean, message: string = null) {
        // @ts-ignore
        const findIndex = this.errorReturn.findIndex(value => value.url === url && (value.rbody && value.rbody.orderid === rbody.orderid && value.rbody.type === rbody.type && value.rbody.id === rbody.id))
        if (findIndex < 0) {
            const Model = {
                url,
                rbody,
                wishlistip,
                count: 1
            }
            // @ts-ignore
            this.errorReturn.push(Model)
            setTimeout(() => this.requestToCustomer(url, rbody, wishlistip), 15000)
        } else {
            // @ts-ignore
            const count = this.errorReturn[findIndex].count + 1
            if (count < 10) {
                setTimeout(() => this.requestToCustomer(url, rbody, wishlistip), 15000)
            } else {
                this.errorReturn.splice(findIndex, 1)
                this.errorRequestNotify(message)
            }
        }
    }

    async errorRequestNotify(message) {
        const env = process.env.ENV
        Logger.debug(`request notify error env ${env}`)
        if (env === 'shop2pay') {
            this.hookToLineNotify('e88IxrhJKyI97RTYcoyF4tWhKDw3M5rzfTcN4N04RpQ', message)
        }
        if (env === 'fundpay') {
            this.hookToLineNotify('pUE5IYG3UcX03Qg6BujsVO5lEHziVTYkEVF6dt7Kcnc', message)
        }
    }

    async hookToCustomer(id, type) {
        if (type === 'deposit') {
            const getData = await this.databaseService.depositRepository.findOne({
                where: {
                    id: id,
                },
                relations: ['customer', 'customer.webhooks']
            })
            if (getData) {
                const ModelBody: any = {
                    type: 'deposit',
                    orderid: getData.orderid,
                    id: getData.token,
                    status: getData.status
                }
                if (getData.comment) {
                    ModelBody.comment = getData.comment
                }
                if (getData.customer) {
                    const wishlistIp = getData.customer.wishlistIp ? true : false
                    const signature = await this.Encrypt(getData.customer.secertkey, ModelBody)
                    if (getData.customer.webhooks.length > 0) {
                        for (const x of getData.customer.webhooks) {
                            const message = `${x.url} for OrderID ${ModelBody.orderid}`
                            Logger.debug(message)
                            await this.requestToCustomer(x.url, {...ModelBody, signature}, wishlistIp)
                        }
                    }
                    if (getData.callback) {
                        const message = `${getData.callback} for OrderID ${ModelBody.orderid}`
                        Logger.debug(message)
                        await this.requestToCustomer(getData.callback, {
                            ...ModelBody,
                            signature
                        }, wishlistIp)
                    }
                }
                await this.convertToMessage('deposit', getData.id, 'update')
            }
        }
        if (type === 'withdraw') {
            const getData = await this.databaseService.withdrawRepository.findOne({
                where: {
                    id: id,
                },
                relations: ['customer', 'customer.webhooks']
            })
            if (getData) {
                const ModelBody = {
                    type: 'withdraw',
                    orderid: getData.orderid,
                    id: getData.token,
                    status: getData.status
                }
                if (getData.customer) {
                    const wishlistIp = getData.customer.wishlistIp ? true : false
                    const signature = this.Encrypt(getData.customer.secertkey, ModelBody)
                    if (getData.customer.webhooks.length > 0) {
                        for (const x of getData.customer.webhooks) {
                            const message = `${x.url} for OrderID ${ModelBody.orderid}`
                            Logger.debug(message)
                            await this.requestToCustomer(x.url, {...ModelBody, signature}, wishlistIp)
                        }
                    }
                    if (getData.callback) {
                        const message = `${getData.callback} for OrderID ${ModelBody.orderid}`
                        Logger.debug(message)
                        await this.requestToCustomer(getData.callback, {
                            ...ModelBody,
                            signature
                        }, wishlistIp)
                    }

                }
                await this.convertToMessage('withdraw', getData.id, 'update')
            }
        }
    }

    Encrypt(secretkey, body) {
        const sortdata = Object.keys(body).sort()
        let msg = ''
        for (const x of sortdata) {
            msg += `${x}=${body[x]}&`
        }
        msg += `key=${secretkey}`

        return crypto.createHash('MD5').update(msg).digest('hex')
    }
}
