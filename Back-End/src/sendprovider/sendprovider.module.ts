import {Module} from '@nestjs/common';
import {EmailModule} from './email/email.module';
import { WebshareioModule } from './webshareio/webshareio.module';

@Module({
    imports: [
        EmailModule,
        WebshareioModule,
    ],
    exports: [
        EmailModule,
        WebshareioModule
    ]
})
export class SendproviderModule {
}
