import { Module } from '@nestjs/common';
import { PiPayService } from './pi-pay.service';
import { TransactionsController } from './pi-pay.controller';

@Module({
  providers: [PiPayService],
  controllers: [TransactionsController],
})
export class PiPayModule {}
