import { Module } from '@nestjs/common';
import { CancelModule } from './cancel/cancel.module';
import { SmsModule } from './sms/sms.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [CancelModule, SmsModule, EmailModule]
})
export class AutoModule {}
