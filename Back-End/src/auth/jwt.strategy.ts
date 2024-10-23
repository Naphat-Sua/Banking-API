import {Injectable, UnauthorizedException} from "@nestjs/common";
import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {ShareService} from "../share/share.service";
import KeyJWT from "./KeyJWT";
import {DatabaseService} from "../database/database.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private databaseService: DatabaseService,
        private shareService: ShareService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: KeyJWT,
        });
    }

    async validate(payload: any): Promise<any> {
        const role = payload.role ? payload.role : null;
        if (!role) {
            throw new UnauthorizedException();
        }
        const CheckStatus = await this.checkStatus(payload.id, payload.role)
        if (!CheckStatus) {
            throw new UnauthorizedException()
        }
        return {...payload};
    }

    async checkStatus(id: number, role: string): Promise<boolean> {
        if (role === 'admin') {
            const checkDB = await this.databaseService.adminRepository.findOne({id, ban: false, isDelete: false})
            return checkDB ? true : false
        } else if (role === 'manager') {
            const checkDB = await this.databaseService.managerRepository.findOne({id, ban: false, isDelete: false})
            return checkDB ? true : false
        } else if (role === 'operation') {
            const checkDB = await this.databaseService.operationRepository.findOne({id, ban: false, isDelete: false})
            return checkDB ? true : false
        } else if (role === 'customer') {
            const checkDB = await this.databaseService.customerRepository.findOne({id, isDelete: false})
            return checkDB ? true : false
        } else if (role === 'agent') {
            const checkDB = await this.databaseService.agentRepository.findOne({id, isDelete: false})
            return checkDB ? true : false
        } else {
            return false
        }
    }
}
