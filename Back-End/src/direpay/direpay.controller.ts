import {Body, Controller, Headers, Post, Res} from '@nestjs/common';
import {DirePayService} from './direpay.service';
import {
  ExchangeRateDto,
  ExchangeRateResponse,
  PaymentDto,
  PaymentResponse,
  WithdrawCallbackDto,
  WithdrawDto,
  WithdrawResponse
} from './dto';

@Controller('direpay/merchant')
export class DirePayController {
  constructor(private readonly direPayService: DirePayService) {
  }

  @Post('createPaymentCheckout')
  async createPaymentCheckout(@Body() body: PaymentDto): Promise<any> {
    return await this.direPayService.createPaymentCheckout(body);
  }

  @Post('createPaymentApi')
  async createPaymentApi(@Body() body: PaymentDto): Promise<PaymentResponse> {
    return await this.direPayService.createPayment(body);
  }

  @Post('withdraw')
  async withdraw(@Body() body: WithdrawDto): Promise<WithdrawResponse> {
    return await this.direPayService.withdraw(body);
  }

  @Post('getExchangeeRate')
  async getExchangeRate(@Body() rateData: ExchangeRateDto): Promise<ExchangeRateResponse> {
    return await this.direPayService.getExchangeRate(rateData);
  }

  @Post('paymentCallback')
  async paymentCallback(@Body() callbackData: any, @Headers('Signature') signature: string, @Res() res): Promise<any> {
    return await this.direPayService.handleCallback(callbackData, signature, res);
  }

  @Post('withdrawCallback')
  async withdrawCallback(@Body() callbackData: WithdrawCallbackDto, @Headers('Signature') signature: string, @Res() res): Promise<any> {
    return await this.direPayService.handleWithdrawCallback(callbackData, signature, res);
  }

  @Post('getTxStatus')
  async getTxStatus(@Body() body: { txid: string }): Promise<any> {
    const {txid} = body
    return await this.direPayService.getTransactionStatus(txid);
  }
}
