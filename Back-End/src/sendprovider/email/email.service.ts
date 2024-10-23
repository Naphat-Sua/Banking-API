import {Injectable, Logger} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {Formatmessage} from './formatmessage'
import * as nodemailer from 'nodemailer'

@Injectable()
export class EmailService {

    private transporter: any
    private messageOption: any

    constructor(
        private configService: ConfigService,
        private formatmessage: Formatmessage
    ) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>('email.host'),
            port: this.configService.get<number>('email.port'),
            secure: false,
            pool: true,
            auth: {
                user: this.configService.get<string>('email.username'),
                pass: this.configService.get<string>('email.password')
            }
        })
        this.messageOption = {
            from: `Support <${this.configService.get<string>('email.username')}>`,
            to: null,
            subject: null,
            html: null
        }
    }

    createCustomer(email, customer, username, password, key, secertkey, cc) {
        let msg = '<b>Deal All,<br/>'
        msg += `<p>This is information for new ${customer} integration.</p>`
        msg += `<p>Customer Backoffice`
        msg += `Url: https://${this.configService.get<string>('env').indexOf('sandbox') < 0 ? 'customer' : 'customer-sandbox'}.${this.configService.get<string>('domain')}/ <br/>`
        msg += `username: ${username} <br/>`
        msg += `password: ${password} </p>`
        msg += `<p>API information: ${this.configService.get<string>('baseURL')}/docs/api <br/>`
        msg += `- Key: ${key} <br/>`
        msg += `- SecertKey: ${secertkey} <br/>`
        msg += '</p></b>'
        this.messageOption.to = email
        this.messageOption.subject = `This is information for integration.`
        if (cc.length > 0) {
            this.messageOption.cc = cc
        }
        this.messageOption.html = msg
        this.sendEmail(this.messageOption)
    }

    createAgent(email, name, username, password, cc) {
        let msg = `<b>Deal All,<br/>`
        msg += `<p>This is information for new ${name} .</p>`
        msg += `<p>Agent Backoffice`
        msg += `Url: https://${this.configService.get<string>('env').indexOf('sandbox') < 0 ? 'agent' : 'agent-sandbox'}.${this.configService.get<string>('domain')}/ <br/>`
        msg += `username: ${username} <br/>`
        msg += `password: ${password} </p>`
        this.messageOption.to = email
        this.messageOption.subject = `This is information agent.`
        if (cc.length > 0) {
            this.messageOption.cc = cc
        }
        this.messageOption.html = msg
        this.sendEmail(this.messageOption)
    }

    createOperation(email, name, username, password) {
        let msg = `<b>สวัสดีคุณ ${name} นี้คือข้อมูลการเข้าสู่ระบบเพื่อทำงาน<br/>`
        msg += `https://${this.configService.get<string>('env').indexOf('sandbox') < 0 ? 'operation' : 'operation-sandbox'}.${this.configService.get<string>('domain')}/<br/>`
        msg += `username: ${username} <br/>`
        msg += `password: ${password} <br/>`
        msg += `</b>`
        this.messageOption.to = email
        this.messageOption.subject = 'ข้อมูลเข้าระบบ Operation Shop2pay'
        this.messageOption.html = msg
        this.sendEmail(this.messageOption)
    }

    createManager(email, name, username, password) {
        let msg = `<b>สวัสดีคุณ ${name} นี้คือข้อมูลการเข้าสู่ระบบเพื่อทำงาน<br/><br/>`
        msg += `https://${this.configService.get<string>('env').indexOf('sandbox') < 0 ? 'manager' : 'manager-sandbox'}.${this.configService.get<string>('domain')}/<br/>`
        msg += `username: ${username} <br/>`
        msg += `password: ${password} <br/>`
        msg += `</b>`
        this.messageOption.to = email
        this.messageOption.subject = 'ข้อมูลเข้าระบบ Manager Shop2pay'
        this.messageOption.html = msg
        this.sendEmail(this.messageOption)
    }
    createMerchant(email, merchantId, password, secertkey, key, cc) {
        let msg = '<b>Deal All,<br/>'
        msg += `<p>This is information for new ${merchantId} integration.</p>`
        msg += `<p>Customer Backoffice`
        msg += `Url: https://${this.configService.get<string>('env').indexOf('sandbox') < 0 ? 'merchant' : 'merchant-sandbox'}.${this.configService.get<string>('domain')}/ <br/>`
        msg += `username: ${merchantId} <br/>`
        msg += `password: ${password} </p>`
        msg += `<p>API information: ${this.configService.get<string>('baseURL')}/docs/api <br/>`
        msg += `- Key: ${key} <br/>`
        msg += `- SecertKey: ${secertkey} <br/>`
        msg += '</p></b>'
        this.messageOption.to = email
        this.messageOption.subject = `This is information for integration.`
        if (cc.length > 0) {
            this.messageOption.cc = cc
        }
        this.messageOption.html = msg
        this.sendEmail(this.messageOption)
    }

    sendEmail(messageOptions): void {
        if (messageOptions && !messageOptions.from) {
            messageOptions.from = this.messageOption.from
        }
        messageOptions.html += this.formatmessage.Signature()
        this.transporter.sendMail(messageOptions, function (err, info) {
            if (err)
                Logger.debug(err)
            else
                Logger.debug(info);
        });
    }
}
