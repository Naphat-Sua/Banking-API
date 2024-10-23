import {Injectable, UnauthorizedException} from '@nestjs/common';
import {ShareService} from "../share/share.service";
import {LoginInput} from "../dto/Login.input";
import * as crypto from "crypto";
import {DatabaseService} from "../database/database.service";

@Injectable()
export class OperationService {
    constructor(
        private databaseService: DatabaseService,
        private shareService: ShareService
    ) {
    }

    async checkAuth(payload) {
        return {
            status: true
        }
    }

    async Profile(payload){
        const getData = await this.databaseService.operationRepository.findOne(payload.id)
        delete getData.password
        delete getData.token
        return getData
    }

    async Login(body: LoginInput, XForwardedFor, Ip) {
        const forwardedIp = XForwardedFor;
        const requestIp = forwardedIp ? forwardedIp.indexOf(',') >= 0 ? forwardedIp.split(',')[0] : forwardedIp : Ip;
        const getUser = await this.databaseService.operationRepository.findOne({
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
            role: 'operation',
            token: getUser.token,
            ip: requestIp
        }
        const getToken = await this.shareService.authService.getToken(ModelSign)
        return getToken
    }

}
