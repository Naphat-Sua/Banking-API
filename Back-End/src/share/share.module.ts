import {Global, Module} from '@nestjs/common';
import {ShareService} from './share.service';
import {AuthModule} from "../auth/auth.module";
import {WebhookModule} from "../webhook/webhook.module";
import {SendproviderModule} from "../sendprovider/sendprovider.module"
import {WebsocketsModule} from "../websockets/websockets.module";
import {BanktransferModule} from './banktransfer/banktransfer.module';
import {BanktransferService} from "./banktransfer/banktransfer.service";
import { McpaymentModule } from './mcpayment/mcpayment.module';

@Global()
@Module({
    imports: [
        AuthModule,
        WebhookModule,
        SendproviderModule,
        WebsocketsModule,
        BanktransferModule,
        McpaymentModule,
    ],
    exports: [
        AuthModule,
        ShareService,
    ],
    providers: [
        BanktransferService,
        ShareService,
    ]
})
export class ShareModule {
}
