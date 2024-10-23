import {NestMiddleware, UnauthorizedException} from "@nestjs/common";
import {McpaymentDatabaseService} from "../../../../mcpayment-database/mcpayment-database.service";
import * as crypto from "crypto";

export class ApimcMiddleware implements NestMiddleware {
    constructor(
        private mcpaymentDb: McpaymentDatabaseService
    ) {
    }

    async use(req: Request, res: Response, next: Function) {
        const Auththorization = req.headers['authorization'];

        if (!Auththorization) {
            throw new UnauthorizedException()
        }
        const getData = await this.mcpaymentDb.customer.findOne({
            where: {
                key: Auththorization,
                isBan: false
            },
            withDeleted: true
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
