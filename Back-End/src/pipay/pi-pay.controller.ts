import { Controller, Post, Body, Query, Get, Res } from '@nestjs/common';
import { PiPayService } from './pi-pay.service';
import { PiPayStartTransactionDto , PiPayVerifyTransactionDto} from './dto/transaction.output';
import { Order } from 'src/entities/Order';
import { OrderOutput } from './dto/order.output';
import { MerchantDto } from './dto/merchant.dto';


@Controller('pipay/merchant')
export class TransactionsController {
  constructor(private readonly piPayService: PiPayService) {}

  @Post('startTransaction')
  async startTransaction(@Body() startTransactionDto: PiPayStartTransactionDto) : Promise<any> {
    const response = await this.piPayService.startTransaction(startTransactionDto);
    console.log('data response from PiPay1='+response.url);
    console.log('data response from PiPay2='+response.reqPipayData);
    return response;
  }
  @Post('verifytransaction')
  async verifyTransaction(@Query() queryData,  @Res() res) : Promise<any> {
    const response = await this.piPayService.verifyTransaction(queryData, res);
    return response;
  }
  @Get('confirmPaymentPipay')
  async confirmPaymentPipay(@Query() queryData,  @Res() res) : Promise<any> {
    const response = await this.piPayService.verifyTransaction(queryData, res);
    return response;
  }
  @Get('cancelPaymentPipay')
  async cancelPaymentPipay(@Query() queryData, @Res() res) : Promise<any> {
    const response = await this.piPayService.cancelTransaction(queryData, res);
    return response;
  }
  @Post('addMerchant')
  async addMerchant(@Body()  body:MerchantDto):Promise<any>{
    const status = await this.piPayService.addMerchant(body);
    return status;
  }
  @Get('getMerchants')
  async getMerchants(@Query() query, @Query('page') page: number, @Query('rows') rows: number):Promise<any>{
    const rs = await this.piPayService.getMerchants(query, page, rows);
    return rs;
  }
  @Get('getMerchantIDs')
  async getMerchantIDs():Promise<any> {
    const rs = await this.piPayService.getMerchantIDs();
    return rs;
  }
  @Get('getOrders')
  async getOrders(@Query() query, @Query('page') page: number, @Query('rows') rows: number):Promise<any> {
    const rs = await this.piPayService.getOrders(query, page, rows);
    return rs;
  }
  // @Get('getOrders')
  // async getAllOrders(@Query() query, @Query('page') page: number, @Query('rows') rows: number): Promise<OrderOutput[]> {
  //   const orders = await this.piPayService.getAllOrders(query, page, rows);
  //   return orders;
  // }
}
