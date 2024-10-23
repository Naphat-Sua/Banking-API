import {Module} from '@nestjs/common';
import {WebhookService} from './webhook.service';

@Module({
    imports: [],
    providers: [WebhookService],
    exports: [WebhookService]
})
export class WebhookModule {
}
