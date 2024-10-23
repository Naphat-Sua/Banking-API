import {Injectable, UnauthorizedException} from '@nestjs/common';
import {ShareService} from "../share/share.service";
import * as crypto from "crypto";
import {DatabaseService} from "../database/database.service";

@Injectable()
export class ManagerService {
    constructor(
        private databaseService: DatabaseService,
        private shareService: ShareService
    ) {
    }

    async checkAuth(payload){
        return {
            status: true
        }
    }

    async Profile(payload){
        const getData = await this.databaseService.managerRepository.findOne(payload.id)
        delete getData.password
        delete getData.token
        return getData
    }

    async Login(body, XForwardedFor, Ip) {
        const forwardedIp = XForwardedFor;
        const requestIp = forwardedIp ? forwardedIp.indexOf(',') >= 0 ? forwardedIp.split(',')[0] : forwardedIp : Ip;
        const getUser = await this.databaseService.managerRepository.findOne({
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
            role: 'manager',
            token: getUser.token,
            ip: requestIp
        }
        const getToken = await this.shareService.authService.getToken(ModelSign)
        return getToken
    }
}
