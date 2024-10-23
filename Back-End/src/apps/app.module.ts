import {MiddlewareConsumer, Module, NestModule, OnModuleInit, RequestMethod} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import configuration from './configuration';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'path';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ShareModule} from "../share/share.module";
import {AdminModule} from "../admin/admin.module";
import {ManagerModule} from "../manager/manager.module";
import {CustomerModule} from "../customer/customer.module";
import {OperationModule} from "../operation/operation.module";
import {IndexModule} from "../index/index.module";
import {DatabaseModule} from "../database/database.module";
import {DatamigrateModule} from "../datamigrate/datamigrate.module";
import {AutoModule} from "../auto/auto.module";
import {AgentModule} from "../agent/agent.module";
import {CallbackModule} from "../callback/callback.module";
import {WebsocketsModule} from "../websockets/websockets.module";
import {LoggerMiddleware} from "./logger.middleware";
import rootPath from '../rootPath';
import * as fs from 'fs'
import {PaymentpageModule} from "../paymentpage/paymentpage.module";
import {ApiModule} from "../api/api.module";
import {McpaymentDatabaseModule} from "../mcpayment-database/mcpayment-database.module";
import {MongoLogsModule} from "../mongo-logs/mongo-logs.module";
import {SentryModule} from "../sentry/sentry.module";
import { PiPayModule } from '../pipay/pi-pay.module';
import { MastercardCheckoutModule } from '../mastercard/mastercard-checkout.module';
import { DirePayModule } from '../direpay/direpay.module';
import * as Sentry from "@sentry/node";
import '@sentry/tracing';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: 'development.env',
            load: [configuration]
        }),
        SentryModule.forRoot({
            dsn: process.env.SENTRY_DNS,
            tracesSampleRate: 1.0,
            debug: true
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return {
                    type: configService.get<string>('database.type'),
                    host: configService.get<string>('database.host'),
                    port: configService.get<string>('database.port'),
                    username: configService.get<string>('database.username'),
                    password: configService.get<string>('database.password'),
                    database: configService.get<string>('database.name'),
                    entities: ['dist/entities/*{.ts,.js}'],
                    synchronize: Boolean(configService.get<boolean>('database.sync')),
                    logging: Boolean(configService.get<boolean>('database.sync')),
                    logger: 'file',
                    charset: 'utf8_bin',
                    cache: true
                } as TypeOrmModuleOptions;
            },
            inject: [ConfigService],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            name: 'mcpayment',
            useFactory: async (configService: ConfigService) => {
                return {
                    type: configService.get<string>('mcpayment_db.type'),
                    host: configService.get<string>('mcpayment_db.host'),
                    port: configService.get<string>('mcpayment_db.port'),
                    username: configService.get<string>('mcpayment_db.username'),
                    password: configService.get<string>('mcpayment_db.password'),
                    database: configService.get<string>('mcpayment_db.name'),
                    entities: ['dist/mcpayment_entities/*{.ts,.js}'],
                    synchronize: Boolean(configService.get<boolean>('mcpayment_db.sync')),
                    logging: Boolean(configService.get<boolean>('mcpayment_db.sync')),
                    logger: 'file',
                    charset: 'utf8_bin',
                    cache: true
                } as TypeOrmModuleOptions;
            },
            inject: [ConfigService],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            name: 'mongodb_logs',
            useFactory: async (configService: ConfigService) => {
                return {
                    type: configService.get<string>('mongodb_logs.type'),
                    host: configService.get<string>('mongodb_logs.host'),
                    port: configService.get<string>('mongodb_logs.port'),
                    username: configService.get<string>('mongodb_logs.username'),
                    password: configService.get<string>('mongodb_logs.password'),
                    database: configService.get<string>('mongodb_logs.name'),
                    entities: ['dist/entities_logs/*{.ts,.js}'],
                    charset: 'utf8_bin',
                } as TypeOrmModuleOptions;
            },
            inject: [ConfigService],
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        DatabaseModule,
        MongoLogsModule,
        McpaymentDatabaseModule,
        ShareModule,
        AdminModule,
        ApiModule,
        AgentModule,
        IndexModule,
        ManagerModule,
        OperationModule,
        CustomerModule,
        DatamigrateModule,
        AutoModule,
        CallbackModule,
        WebsocketsModule,
        PaymentpageModule,
        PiPayModule,
        MastercardCheckoutModule,
        DirePayModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
    ],
})
export class AppModule implements NestModule, OnModuleInit {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                LoggerMiddleware,
                Sentry.Handlers.requestHandler()
            )
            .exclude({
                method: RequestMethod.GET,
                path: '/auto/cancel'
            })
            .forRoutes('*');
    }

    async onModuleInit(): Promise<void> {
        const getDir = await fs.readdirSync(`${rootPath}`)
        const checkDirLogs = await getDir.findIndex(value => value === 'logs')
        if (checkDirLogs < 0) {
            await fs.mkdirSync(`${rootPath}/logs`)
        }
        const checkDirPublic = await getDir.findIndex(value => value === 'public')
        if (checkDirPublic < 0) {
            await fs.mkdirSync(`${rootPath}/public`)
        }
        const checkDirLogCallback = await getDir.findIndex(value => value === 'LogsCallbackWebhook')
        if (checkDirLogCallback < 0) {
            await fs.mkdirSync(`${rootPath}/LogsCallbackWebhook`)
        }
        const getDirPublic = await fs.readdirSync(`${rootPath}/public`)
        const checkFileIndexPublic = await getDirPublic.findIndex(value => value === 'index.html')
        if (checkFileIndexPublic < 0) {
            await fs.writeFileSync(`${rootPath}/public/index.html`, 'OK', {encoding: "utf-8"})
        }
    }
}
