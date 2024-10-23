import {Module} from '@nestjs/common';
import {SettlementService} from './settlement.service';
import {EmailModule} from "../../../sendprovider/email/email.module";


@Module({
    imports: [EmailModule],
    providers: [SettlementService],
    exports: [SettlementService]
})
export class SettlementModule {
}
