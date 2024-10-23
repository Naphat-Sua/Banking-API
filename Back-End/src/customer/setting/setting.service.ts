import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {ShareService} from "../../share/share.service";
import * as crypto from "crypto";
import * as randtoken from "rand-token";
import {DatabaseService} from "../../database/database.service";
import {ResetPasswordInput} from "./dto/reset-password.input";
import {ResetPasswordOutput} from "./dto/reset-password.output";
import {SetWebhookInput} from "./dto/set-webhook.input";
import {SettingInput} from "./dto/setting.input";

@Injectable()
export class SettingService {
    constructor(
        private databaseService: DatabaseService,
        private shareService: ShareService
    ) {
    }

    async ResetPassword(payload, body: ResetPasswordInput): Promise<ResetPasswordOutput> {
        const getData = await this.databaseService.customerRepository.findOne(payload.id)
        const hashPassword = crypto.createHash('MD5').update(body.currentpassword).digest('hex')
        if (getData.password !== hashPassword) {
            throw new BadRequestException({
                code: 400,
                message: 'The current password is not correct.'
            })
        }
        if (body.newpassword !== body.confirmnewpassword) {
            throw new BadRequestException({
                code: 400,
                message: 'Please confirm the password to match.'
            })
        }
        const hashNewPassword = crypto.createHash('MD5').update(body.newpassword).digest('hex')
        getData.password = hashNewPassword
        getData.token = randtoken.generate(256)
        const Result = await this.databaseService.customerRepository.save(getData)
        const PayloadSignToken = {
            id: Result.id,
            role: 'customer',
            token: Result.token,
            ip: payload.ip
        }
        const SignToken = await this.shareService.authService.getToken(PayloadSignToken)
        return SignToken
    }

    async SetWebhook(payload, body: SetWebhookInput) {
        const getData = await this.databaseService.webhookRepository.findOne({
            where: {
                customerId: payload.id
            }
        })
        if (getData) {
            getData.url = body.webhook
        } else {
            const Model = {
                customerId: payload.id,
                url: body.webhook
            }
            const Create = await this.databaseService.webhookRepository.create(Model)
            const Result = await this.databaseService.webhookRepository.save(Create)
        }
        return {
            status: true
        }
    }

    async Setting(payload, body: SettingInput) {
        const getUser = await this.databaseService.customerRepository.findOne(payload.id)
        if (!getUser) {
            throw new UnauthorizedException()
        }
        getUser.name = body.name ? body.name : getUser.name
        getUser.phone = body.phone ? body.phone : getUser.phone
        getUser.email = body.email ? body.email : getUser.email
        const Result = await this.databaseService.customerRepository.save(getUser)
        return {
            id: Result.id,
            name: Result.name,
            phone: Result.phone,
            email: Result.email,
            webhook: Result.webhooks
        }
    }
}
