import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {DatamigrateController} from './datamigrate.controller';
import {DatamigrateService} from './datamigrate.service';
import {Formatmessage} from "../sendprovider/email/formatmessage";
import {TotalModule} from './total/total.module';
import {Middleware} from "./Middleware";

@Module({
    controllers: [DatamigrateController],
    providers: [DatamigrateService, Formatmessage],
    imports: [TotalModule]
})
export class DatamigrateModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(Middleware)
            .forRoutes(DatamigrateController)
    }
}
