import {Injectable, NestMiddleware} from "@nestjs/common";
import {NextFunction, Request, Response} from "express";
import * as moment from 'moment-timezone'
import {MongoLogsService} from "../mongo-logs/mongo-logs.service";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(
        private mongoLog: MongoLogsService
    ) {
    }

    use(request: Request, response: Response, next: NextFunction): void {
        const timeNow = moment().format('YYYY-MM-DD HH:mm:ss')
        const start = Date.now();
        let modelRequest = {
            level: 30,
            method: request.method,
            url: request.originalUrl,
            headers: {
                ...request.headers
            },
            remoteAddress: request.ip,
            body: {
                ...request.body
            }
        }
        response.on("finish", () => {
            const modelResponse = {
                statusCode: response.statusCode,
                headers: {
                    ...response.getHeaders()
                }
            }
            this.writeFileLog({
                timestamp: timeNow,
                req: {
                    ...modelRequest
                },
                res: {
                    ...modelResponse
                },
                responseTime: Date.now() - start
            })
        });
        response.on('error', function (error) {
            modelRequest.level = 50
            const modelResponse = {
                statusCode: response.statusCode,
                headers: {
                    ...response.getHeaders()
                }
            }
            this.writeFileLog({
                timestamp: timeNow,
                req: {
                    ...modelRequest
                },
                res: {
                    ...modelResponse
                },
                error,
                responseTime: Date.now() - start
            })
        });
        next();
    }

    async writeFileLog(data) {
        const create = await this.mongoLog.logRequest.create(data)
        await this.mongoLog.logRequest.insert(create)
    }
}
