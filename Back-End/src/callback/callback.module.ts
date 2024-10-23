import {Module} from '@nestjs/common';
import { McpaymentModule } from './mcpayment/mcpayment.module';
import { BankingController } from './banking/banking.controller';
import { BankingService } from './banking/banking.service';

@Module({
    imports: [McpaymentModule],
    controllers: [BankingController],
    providers: [BankingService]
})
export class CallbackModule {
}
