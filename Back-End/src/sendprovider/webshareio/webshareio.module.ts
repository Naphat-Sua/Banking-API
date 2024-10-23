import { Module } from '@nestjs/common';
import { WebshareioService } from './webshareio.service';

@Module({
  providers: [WebshareioService],
  exports: [WebshareioService]
})
export class WebshareioModule {}
