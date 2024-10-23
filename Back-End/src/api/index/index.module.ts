import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {IndexController} from './index.controller';
import {IndexService} from './index.service';
import {ApiMiddleware} from "../api.middleware";

@Module({
    controllers: [IndexController],
    providers: [IndexService]
})
export class IndexModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer
            .apply(ApiMiddleware)
            .exclude(
                {
                    path: '/api/image/qrcode',
                    method: RequestMethod.GET
                }
            )
            .forRoutes(IndexController)
    }
}
