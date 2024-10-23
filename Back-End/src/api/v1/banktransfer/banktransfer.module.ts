import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {BanktransferController} from './banktransfer.controller';
import {BanktransferService} from './banktransfer.service';
import {ApiMiddleware} from "../../api.middleware";
import { ImageQrcodeController } from './image-qrcode/image-qrcode.controller';
import { M88Module } from './m88/m88.module';
import { HuayModule } from './huay/huay.module';

@Module({
    controllers: [BanktransferController, ImageQrcodeController],
    providers: [BanktransferService],
    exports: [BanktransferService],
    imports: [M88Module, HuayModule]
})
export class BanktransferModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer
            .apply(ApiMiddleware)
            .exclude({
                path: '/api/v1/image/qrcode',
                method: RequestMethod.GET
            })
            .forRoutes(BanktransferController)
    }
}
