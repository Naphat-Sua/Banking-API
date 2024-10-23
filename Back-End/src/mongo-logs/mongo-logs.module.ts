import {Global, Module} from '@nestjs/common';
import {MongoLogsService} from './mongo-logs.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Logs_request} from "../entities_logs/logs_request";

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([Logs_request], 'mongodb_logs')
    ],
    providers: [MongoLogsService],
    exports: [
        TypeOrmModule,
        MongoLogsService
    ]
})
export class MongoLogsModule {
}
