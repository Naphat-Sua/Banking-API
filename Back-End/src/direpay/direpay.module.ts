import {Module} from '@nestjs/common';
import {DirePayService} from './direpay.service';
import {DirePayController} from './direpay.controller';

@Module({
  providers: [DirePayService],
  controllers: [DirePayController],
})
export class DirePayModule {
}
