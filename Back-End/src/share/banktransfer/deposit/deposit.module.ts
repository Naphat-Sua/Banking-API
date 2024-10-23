import {Module} from '@nestjs/common';
import {DepositService} from './deposit.service';
import {EmailModule} from "../../../sendprovider/email/email.module";

@Module({
    imports: [EmailModule],
    providers: [DepositService],
    exports: [DepositService]
})
export class DepositModule {
}
