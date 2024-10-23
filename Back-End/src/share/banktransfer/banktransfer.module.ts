import {Module} from '@nestjs/common';
import {DepositModule} from './deposit/deposit.module';
import {WithdrawModule} from './withdraw/withdraw.module';
import {SettlementModule} from './settlement/settlement.module';
import {CalculateModule} from './calculate/calculate.module';
import {AccountbankModule} from './accountbank/accountbank.module';
import {ReportModule} from './report/report.module';
import { CovertMessageAutoModule } from './covert-message-auto/covert-message-auto.module';

@Module({
    imports: [
        DepositModule, WithdrawModule, SettlementModule, CalculateModule, AccountbankModule, ReportModule, CovertMessageAutoModule
    ],
    exports: [
        DepositModule, WithdrawModule, SettlementModule, CalculateModule, AccountbankModule, ReportModule, CovertMessageAutoModule
    ],
})
export class BanktransferModule {

}
