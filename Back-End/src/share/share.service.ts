import {Injectable} from '@nestjs/common';
import {AuthService} from "../auth/auth.service";
import {WebhookService} from "../webhook/webhook.service";
import {ConfigService} from "@nestjs/config";
import {EmailService} from "../sendprovider/email/email.service";
import {DatabaseService} from "../database/database.service";
import * as crypto from "crypto";
import * as request from 'request';
import {WebsocketsService} from "../websockets/websockets.service";
import {BanktransferService} from "./banktransfer/banktransfer.service";
import {WebshareioService} from "../sendprovider/webshareio/webshareio.service";
import {McpaymentService} from "./mcpayment/mcpayment.service";


@Injectable()
export class ShareService {
    constructor(
        private databaseService: DatabaseService,
        public authService: AuthService,
        public webhookService: WebhookService,
        public configService: ConfigService,
        public emailService: EmailService,
        public proxyipService: WebshareioService,
        public webSocketsSerivce: WebsocketsService,
        public banktransferSerivce: BanktransferService,
        public mcpaymentService: McpaymentService
    ) {
    }


    async saveLogOrder(payload, result, type, comment: string = null) {
        let modelSaveLog = {
            role: payload.role,
            status: result.status,
            adminId: undefined,
            operationId: undefined,
            managerId: undefined,
            customerId: undefined,
            withdrawId: undefined,
            depositId: undefined,
            image: undefined,
            autosmsId: undefined,
            bot: undefined,
            settlementId: undefined,
            comment: comment
        }
        if (payload.role === 'admin') {
            modelSaveLog.adminId = payload.id
        }
        if (payload.role === 'operation') {
            modelSaveLog.operationId = payload.id
        }
        if (payload.role === 'manager') {
            modelSaveLog.managerId = payload.id
        }
        if (payload.role === 'customer') {
            modelSaveLog.customerId = payload.id
        }
        if (payload.role === 'autosms') {
            modelSaveLog.autosmsId = payload.id
            modelSaveLog.bot = true
        }
        if (type === 'withdraw') {
            modelSaveLog.withdrawId = result.id
        }
        if (type === 'deposit') {
            modelSaveLog.depositId = result.id
        }
        if (type === 'settlement') {
            modelSaveLog.settlementId = result.id
        }
        if (payload.role === 'auto' || payload.role === 'inputdata') {
            modelSaveLog.bot = true
        }
        if (result.image) {
            modelSaveLog.image = result.image
        }
        const CreateLog = await this.databaseService.logsorderRepository.create(modelSaveLog)
        const ResultSaveLog = await this.databaseService.logsorderRepository.save(CreateLog)
    }

    async selelctTypeBank() {
        const getData = await this.databaseService.typebankRepository.find()
        return getData.map(value => {
            return {
                value: value.id,
                label: value.name
            }
        })
    }

    checkJson(data) {
        try {
            JSON.parse(data);
        } catch (e) {
            return false;
        }
        return true;
    }

    getRequest(options): Promise<{ resp: any, body: any }> {
        return new Promise((resolve, reject) => {
            request({
                ...options
            }, (err, resp, body) => {
                if (err) {
                    reject(err)
                }
                if (body) {
                    resolve({
                        resp,
                        body
                    })
                }
            })
        })
    }

    encryptSignatureMD5(secretkey, body) {
        const sortdata = Object.keys(body).sort()
        let msg = ''
        for (const x of sortdata) {
            msg += `${x}=${typeof body[x] === 'object' && this.checkJson(body[x]) ? JSON.stringify(body[x]) : body[x]}&`
        }
        msg += `key=${secretkey}`
        return crypto.createHash('MD5').update(msg).digest('hex')
    }

}
