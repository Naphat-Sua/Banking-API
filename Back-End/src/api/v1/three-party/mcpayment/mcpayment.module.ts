import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {McpaymentController} from './mcpayment.controller';
import {McpaymentService} from './mcpayment.service';
import {ApiMiddleware} from "../../../api.middleware";

@Module({
    controllers: [McpaymentController],
    providers: [McpaymentService]
})
export class McpaymentModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer
            .apply(ApiMiddleware)
            .forRoutes(McpaymentController)
    }
}
