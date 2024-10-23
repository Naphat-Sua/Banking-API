import { Module } from '@nestjs/common';
import { PaymentpageController } from './paymentpage.controller';
import { PaymentpageService } from './paymentpage.service';
import { CryptoModule } from './crypto/crypto.module';
import { McpaymentModule } from './mcpayment/mcpayment.module';

@Module({
  controllers: [PaymentpageController],
  providers: [PaymentpageService],
  imports: [CryptoModule, McpaymentModule]
})
export class PaymentpageModule {}
