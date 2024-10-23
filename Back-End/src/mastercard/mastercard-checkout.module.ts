import { Module } from '@nestjs/common';
import { CheckoutController } from './mastercard-checkout.controller';
import { MastercardService } from './mastercard-checkout.service';
import { AuthInterceptor } from './mastercard-authInterceptor'; // Đảm bảo thay đổi đường dẫn đến interceptor
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  controllers: [CheckoutController],
  providers: [
    MastercardService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: AuthInterceptor,
    // },
  ],
})
export class MastercardCheckoutModule {}
