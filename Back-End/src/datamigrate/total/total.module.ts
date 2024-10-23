import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {TotalController} from './total.controller';
import {TotalService} from './total.service';
import {Middleware} from "../Middleware";

@Module({
    controllers: [TotalController],
    providers: [TotalService]
})
export class TotalModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(Middleware)
            .forRoutes(TotalController)
    }
}
