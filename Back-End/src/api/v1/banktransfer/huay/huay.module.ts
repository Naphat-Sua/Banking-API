import {forwardRef, MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {HuayController} from './huay.controller';
import {HuayService} from './huay.service';
import {ApiMiddleware} from "../../../api.middleware";
import {BanktransferModule} from "../banktransfer.module";
import { ImageQrcodeController } from './image-qrcode/image-qrcode.controller';

@Module({
    imports: [
        forwardRef(() => BanktransferModule)
    ],
    controllers: [HuayController, ImageQrcodeController],
    providers: [HuayService]
})
export class HuayModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer
            .apply(
                ApiMiddleware
            )
            .forRoutes(HuayController)
    }
}
