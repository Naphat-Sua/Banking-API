import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { IndexModule } from './index/index.module';
import { V1Module } from './v1/v1.module';

@Module({
  controllers: [ApiController],
  providers: [ApiService],
  imports: [IndexModule, V1Module]
})
export class ApiModule {}
