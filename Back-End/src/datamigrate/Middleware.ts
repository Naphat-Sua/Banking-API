import {ForbiddenException, NestMiddleware} from "@nestjs/common";

export class Middleware implements NestMiddleware {

    use(req: Request, res: Response, next: Function) {
        const auth = req.headers['x-key']
        if (!auth || (auth && (auth !== 'DarkBoss'))) {
            throw new ForbiddenException()
        }
        next()
    }
}
