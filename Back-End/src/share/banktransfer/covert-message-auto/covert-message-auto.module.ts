import { Module } from '@nestjs/common';
import { CovertMessageAutoService } from './covert-message-auto.service';

@Module({
  providers: [CovertMessageAutoService],
  exports: [CovertMessageAutoService]
})
export class CovertMessageAutoModule {}
