import {Module, OnModuleInit} from '@nestjs/common';
import {DepositModule} from './deposit/deposit.module';
import {WithdrawModule} from './withdraw/withdraw.module';
import {SettlementModule} from './settlement/settlement.module';
import {SettingModule} from './setting/setting.module';
import {CustomerController} from './customer.controller';
import {CustomerService} from './customer.service';
import {SelectModule} from './select/select.module';
import {BankModule} from './bank/bank.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {DatabaseService} from "../database/database.service";
import { McpaymentModule } from './mcpayment/mcpayment.module';

@Module({
    imports: [DepositModule, WithdrawModule, SettlementModule, SettingModule, SelectModule, BankModule, DashboardModule, McpaymentModule],
    controllers: [CustomerController],
    providers: [CustomerService]
})
export class CustomerModule implements OnModuleInit {
    constructor(
        private databaseService: DatabaseService
    ) {
    }

    async onModuleInit(): Promise<void> {
        if (false) {
            const getCustomer = await this.databaseService.customerRepository.find()
            for (const x of getCustomer) {
                const checkTotal = await this.databaseService.totalCustomerBanktransfer.findOne({
                    where: {
                        customerId: x.id
                    }
                })
                if (!checkTotal) {
                    const Model = {
                        customerId: x.id
                    }
                    const Create = await this.databaseService.totalCustomerBanktransfer.create(Model)
                    const Save = await this.databaseService.totalCustomerBanktransfer.save(Create)
                }
                const checkKsher = await this.databaseService.totalKsherRepository.findOne({
                    where: {
                        customerId: x.id
                    }
                })
                if (!checkKsher) {
                    const Model = {
                        customerId: x.id
                    }
                    const Create = await this.databaseService.totalKsherRepository.create(Model)
                    const Save = await this.databaseService.totalKsherRepository.save(Create)
                }
            }
        }
    }
}
