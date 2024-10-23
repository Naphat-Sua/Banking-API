import {Injectable, NestMiddleware, UnauthorizedException} from "@nestjs/common";
import {DatabaseService} from "../database/database.service";
import * as crypto from "crypto";

@Injectable()
export class ApiMiddleware implements NestMiddleware {
    constructor(
        private database: DatabaseService
    ) {
    }

    async use(req: Request, res: Response, next: Function) {
        const Auththorization = req.headers['authorization'];

        if (!Auththorization) {
            throw new UnauthorizedException()
        }
        const getData = await this.database.customerRepository.findOne({
            authApi: Auththorization,
            isDelete: false,
            ban: false
        })
        if (!getData) {
            throw new UnauthorizedException()
        }
        if (getData.encrypto && req.method !== 'GET') {
            const body = req.body
            const sortdata = Object.keys(body).sort()
            let msg = ''
            for (const x of sortdata) {
                if (x !== 'signature') {
                    msg += `${x}=${body[x]}&`
                }
            }
            msg += `key=${getData.secertkey}`
            const hashkey = crypto.createHash('MD5').update(msg).digest('hex')
            // @ts-ignore
            if (req.body && (req.body.signature !== hashkey)) {
                throw new UnauthorizedException({
                    code: 401,
                    message: 'The signature is not valid.'
                })
            }
        }
        next();
    }
}
