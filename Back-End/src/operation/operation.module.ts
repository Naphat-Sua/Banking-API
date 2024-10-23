import { Module } from '@nestjs/common';
import { DepositModule } from './deposit/deposit.module';
import { WithdrawModule } from './withdraw/withdraw.module';
import { OperationController } from './operation.controller';
import { OperationService } from './operation.service';
import { SelectModule } from './select/select.module';
import { SettingModule } from './setting/setting.module';
import { SettlementModule } from './settlement/settlement.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [DepositModule, WithdrawModule, SelectModule, SettingModule, SettlementModule, CustomerModule],
  controllers: [OperationController],
  providers: [OperationService]
})
export class OperationModule {}
