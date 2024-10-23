import { Body, Controller, Get, Headers, Post, Query, Req, Res } from '@nestjs/common';
import { MastercardService } from './mastercard-checkout.service';
import { OrderDto } from './dto/order.dto';
import { Request } from 'express';
import { MerchantDto } from './dto/merchant.dto';
@Controller('creditcard/merchant')
export class CheckoutController {
  constructor(private readonly mastercardService: MastercardService) {}

  @Post('checkout')
  async initiateCheckout(@Req() req, @Body()  body:OrderDto, @Headers('Authorization') authorizationHeader: string): Promise<any> {
    try {
      const sessionId = await this.mastercardService.initiateCheckout(body, authorizationHeader);
      console.log('session ID============='+sessionId);
      return sessionId;
    } catch (error) {
      throw new Error(`Failed to get checkout session ID:${error.message}`);
    }
  }
  @Get('confirmPayment')
  async confirmPayment(@Query() query,  @Res() res):Promise<any>{
    await this.mastercardService.confirmPayment(query, res);
  }
  @Post('addMerchant')
  async addMerchant(@Body()  body:MerchantDto):Promise<any>{
    try {
      const status = await this.mastercardService.addMerchant(body);
      return status;
    } catch (error) {
      console.log(error.message);
    }
    return null;
  }
  @Get('getMerchants')
  async getMerchants(@Query() query, @Query('page') page: number, @Query('rows') rows: number):Promise<any>{
    const rs = await this.mastercardService.getMerchants(query, page, rows);
    return rs;
  }
  @Get('getMerchantIDs')
  async getMerchantIDs():Promise<any> {
    const rs = await this.mastercardService.getMerchantIDs();
    return rs;
  }
  @Get('getOrders')
  async getOrders(@Query() query, @Query('page') page: number, @Query('rows') rows: number):Promise<any> {
    const rs = await this.mastercardService.getOrders(query, page, rows);
    return rs;
  }
}
