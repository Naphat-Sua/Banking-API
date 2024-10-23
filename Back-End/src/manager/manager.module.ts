import { Module } from '@nestjs/common';
import { DepositModule } from './deposit/deposit.module';
import { WithdrawModule } from './withdraw/withdraw.module';
import { BankModule } from './bank/bank.module';
import { SettlementModule } from './settlement/settlement.module';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
import { SettingModule } from './setting/setting.module';
import { SelectModule } from './select/select.module';
import { OperationModule } from './operation/operation.module';
import { CustomerModule } from './customer/customer.module';
import { McpaymentModule } from './mcpayment/mcpayment.module';

@Module({
  imports: [DepositModule, WithdrawModule, BankModule, SettlementModule, SettingModule, SelectModule, OperationModule, CustomerModule, McpaymentModule],
  controllers: [ManagerController],
  providers: [ManagerService]
})
export class ManagerModule {}
