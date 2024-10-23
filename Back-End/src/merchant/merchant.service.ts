import {Injectable, UnauthorizedException} from '@nestjs/common';
import {ShareService} from "../share/share.service";
import * as crypto from "crypto";
import {LoginInput} from "../dto/Login.input";
import {DatabaseService} from "../database/database.service";

@Injectable()
export class CustomerService{
    constructor(
        private databaseService: DatabaseService,
        private shareService: ShareService
    ) {
    }

    async Profile(payload) {
        const getData = await this.databaseService.customerRepository.findOne(payload.id, {relations: ['webhooks']})
        if (!getData) {
            throw new UnauthorizedException()
        }
        delete getData.password
        delete getData.token
        return getData
    }

    async Login(body: LoginInput, XForwardedFor, Ip) {
        console.log('login customer')
        const forwardedIp = XForwardedFor;
        const requestIp = forwardedIp ? forwardedIp.indexOf(',') >= 0 ? forwardedIp.split(',')[0] : forwardedIp : Ip;
        const getUser = await this.databaseService.customerRepository.findOne({
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
            role: 'customer',
            token: getUser.token,
            ip: requestIp
        }
        const getToken = await this.shareService.authService.getToken(ModelSign)
        return getToken
    }
}
