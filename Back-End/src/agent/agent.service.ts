import {Injectable, UnauthorizedException} from '@nestjs/common';
import {LoginInput} from "../dto/Login.input";
import * as crypto from "crypto";
import {DatabaseService} from "../database/database.service";
import {ShareService} from "../share/share.service";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AgentService {

    constructor(
        private databaseService: DatabaseService,
        private shareService: ShareService,
        private configService: ConfigService
    ) {
    }

    async checkAuth(payload) {
        return {
            status: true
        }
    }

    async Profile(payload) {
        const getData = await this.databaseService.agentRepository.findOne(payload.id)
        delete getData.password
        delete getData.token
        delete getData.customers
        return getData
    }

    async Login(body: LoginInput, XForwardedFor, Ip) {
        const forwardedIp = XForwardedFor;
        const requestIp = forwardedIp ? forwardedIp.indexOf(',') >= 0 ? forwardedIp.split(',')[0] : forwardedIp : Ip;
        const getUser = await this.databaseService.agentRepository.findOne({
            where: {
                username: body.username,
                password: crypto.createHash('MD5').update(body.password).digest('hex'),
                isDelete: false
            }
        })
        if (!getUser) {
            throw new UnauthorizedException()
        }
        const ModelSign = {
            id: getUser.id,
            role: 'agent',
            token: getUser.token,
            ip: requestIp
        }
        const getToken = await this.shareService.authService.getToken(ModelSign)
        return getToken
    }
}
