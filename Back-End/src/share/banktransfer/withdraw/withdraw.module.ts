import {Module} from '@nestjs/common';
import {WithdrawService} from './withdraw.service';
import {EmailModule} from "../../../sendprovider/email/email.module";

@Module({
    imports: [EmailModule],
    providers: [WithdrawService],
    exports: [WithdrawService]
})
export class WithdrawModule {
}
