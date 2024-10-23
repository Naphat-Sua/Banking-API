import { BadRequestException, Injectable, InternalServerErrorException, Res } from '@nestjs/common';
import axios from 'axios';
import * as md5 from 'md5';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';
import {DatabaseService} from "../database/database.service";
import { PiPayStartTransactionDto , PiPayVerifyTransactionDto} from './dto/transaction.output';
import { Order } from 'src/entities/Order';
import { OrderOutput } from './dto/order.output';
import { GetMerchantOutput } from './dto/merchant.output';
import { GetOrderOutput } from './dto/order-report.output ';
import { v4 as uuidv4 } from 'uuid';
import * as randtoken from 'rand-token'
import * as crypto from 'crypto'
@Injectable()
export class PiPayService {
  constructor(
      private config: ConfigService,
      private databaseServicve: DatabaseService
    ) 
    {}
  private readonly baseUrl = this.config.get<string>('pipayURL');
  generateOrderID(): string {
    return uuidv4(); // Sử dụng hàm v4 để tạo mã UUID ngẫu nhiên
  }   
  async startTransaction(transactionData: PiPayStartTransactionDto): Promise<any> {
    const url = `${this.baseUrl}/starttransaction`;
    const currentDateTime = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    const merchantInfo = await this.databaseServicve.merchantPiPayRespository.findOne({
      where: {
        merchant_id: transactionData.merchantId,
       }
    });
    
    if (!merchantInfo) {
      throw new Error(`Merchant not found is invalid.`);
    }
    const orderid = this.generateOrderID();
    const existingOrder = await this.databaseServicve.orderRespository.findOne({ where: { order_id: orderid } });
    if (existingOrder) {
      throw new BadRequestException({
        code: 400,
        message: 'You can not use orderid'
      })
    }
    const mid = merchantInfo.merchant_id;
    const sid = merchantInfo.store_id;
    const did = merchantInfo.device_id;
    const orderAmount = transactionData.amount;
    const confirmUrl = this.config.get<string>('pipayConfirmURL')+'/pipay/merchant/confirmPaymentPipay'
    const cancelUrl = this.config.get<string>('pipayConfirmURL')+'/pipay/merchant/cancelPaymentPipay'
    const inputDigest = {
      mid: mid,
      orderid: orderid,
      orderAmount: orderAmount, // Please note that orderAmount is a string here, not a number
    };
    // Calculate the digest using the input data
    const digest = this.calculateDigest(inputDigest);
    const reqData = {
      mid: mid,
      sid: sid,
      did: did,
      lang: 'en',
      orderid: orderid,
      orderDesc: transactionData.description,
      orderAmount: orderAmount, // Replace with the actual order amount
      currency: transactionData.currency, // Replace with the desired currency
      orderDate: currentDateTime, // Replace with the order date
      payMethod: 'wallet', // Replace with the desired payment method
      trType: 1,
      confirmURL: confirmUrl, // Replace with your success redire
      cancelURL: cancelUrl, // Replace with your cancel redirect URL
      description: '',
      digest: digest, // Replace with the digest value
      cancelTimer: 100,
      successScreenDelay: 5,
    }
    const pipayData = {
      reqPipayData: reqData,
      url: url
    }
    
    //save DB
    const orderData = {
      merchant_id: merchantInfo.merchant_id,
      order_id: orderid,
      amount: orderAmount,
      currency: transactionData.currency,
      status: 'wait',
      type: 'PiPay',
      description: transactionData.description
    }
    try {
      const newOrder = this.databaseServicve.orderRespository.create(orderData);
    this.databaseServicve.orderRespository.save(newOrder);
    } catch (error) {
      throw new Error(`PiPay Start Transaction Failed: ${error.message}`);
    }
    
    return pipayData;
    
  }

  async verifyTransaction(queryData, response): Promise<any> {
    try {
      const status = queryData.status;
      const orderID = queryData.orderID;
      const transID = queryData.transID;
      let processorID = null;
      console.log('******CONFIRM PAYMENT PIPAY*******')
      console.log('status pipay ================='+status)
      console.log('orderID pipay ================='+orderID)
      console.log('transID pipay ================='+transID)
       // Tìm bản ghi có order_id tương ứng trong cơ sở dữ liệu
       const existingOrder = await this.databaseServicve.orderRespository.findOne({ where: { order_id: orderID } });
          
       if (!existingOrder) {
         // Nếu không tìm thấy bản ghi, thông báo lỗi và không cập nhật gì cả
         throw new Error(`Order with order_id ${orderID} not found.`);
       }
      if (status === '0000') { // success
        processorID = queryData.processorID;
        console.log('processorID============='+processorID);
        const verifyData = {
          orderID: orderID,
          processorID: processorID
        };
        const url = `${this.baseUrl}/rest-api/verifyTransaction`;
        const response = await axios.post(url, { data: verifyData });
        // Xử lý thông tin giao dịch thành công
        const resultCode = response.data.resultCode;
        console.log('result code pipay=====',resultCode);
        if(resultCode === '0000'){//approved
          const processorResponseCode = response.data.data.processorResponseCode;
          const amount = response.data.data.amount;
          const currency = response.data.data.currency;
          try {
            // Cập nhật trạng thái của bản ghi thành 'cancel'
            existingOrder.status = 'success';
            existingOrder.approve_amount = amount
            existingOrder.success_indicator = processorID
            await this.databaseServicve.orderRespository.save(existingOrder);
          } catch (error) {
            // Xử lý lỗi
            throw new Error(`PiPay Cancel Transaction Failed: ${error.message}`);
          }
          
        }
       
      } else if (status === '0001') { // cancel
        console.log('cancel payment pipay =================')
      }else if (status === '0200') { // cancel
        console.log('user cancel payment pipay =================')
      }else if (status === '0201') { // cancel
        console.log('Invalid wallet payment pipay =================')
      }
       else { // failed
        console.log('fail payment pipay =================')
      }
      const merchantInfo = await this.databaseServicve.merchantPiPayRespository.findOne({
        where: {
          merchant_id: existingOrder.merchant_id,
         }
      });
      const merchantPage = merchantInfo.merchant_url;
      response.redirect(merchantPage);
    } catch (error) {
      throw new Error(`PiPay Verify Transaction Failed: ${error.message}`);
    }
  }
  async cancelTransaction(queryData, response): Promise<any> {
    try {
      const status = queryData.status;
      const orderID = queryData.orderID;
      const transID = queryData.transID;
      console.log('******CANCEL PAYMENT PIPAY*******')
      console.log('status pipay ================='+status)
      console.log('orderID pipay ================='+orderID)
      console.log('transID pipay ================='+transID)
      try {
        // Tìm bản ghi có order_id tương ứng trong cơ sở dữ liệu
        const existingOrder = await this.databaseServicve.orderRespository.findOne({ where: { order_id: orderID } });
      
        if (!existingOrder) {
          // Nếu không tìm thấy bản ghi, thông báo lỗi và không cập nhật gì cả
          throw new Error(`Order with order_id ${orderID} not found.`);
        }
      
        // Cập nhật trạng thái của bản ghi thành 'cancel'
        existingOrder.status = 'cancel';
        await this.databaseServicve.orderRespository.save(existingOrder);
      } catch (error) {
        // Xử lý lỗi
        throw new Error(`PiPay Cancel Transaction Failed: ${error.message}`);
      }
      
      response.redirect(this.config.get<string>('pipayHomePageURL'));
    } catch (error) {
      throw new Error(`PiPay Verify Transaction Failed: ${error.message}`);
    }
  }
  // async getAllOrders(query, page: number = 1, rows: number = 20): Promise<OrderOutput[]> {
  //   const orderData = await this.databaseServicve.orderRespository
  //   .createQueryBuilder('Order')
  //  .getMany();

  //   const orders = orderData.map((value) => {
  //     return {
  //       id: value.id,
  //       orderId: value.order_id,
  //       amount: value.amount,
  //       currency: value.currency,
  //       description: value.description,
  //       token: value.token,
  //       customerId: value.customer_id,
  //       createAt: moment(value.createAt).toDate(),
  //       updateAt: moment(value.updateAt).toDate(),
  //       status: value.status,
  //       approveAmount: value.approve_amount,
  //       type: value.type,
  //       successIndicator: value.success_indicator
  //     };
  //   });
    
  //   return orders;

  // }
  async addMerchant(queryData): Promise<string> {
    const existingMerchant= await this.databaseServicve.merchantPiPayRespository.findOne({ where: { merchant_id: queryData.merchantId } });
      
    if (existingMerchant) {
      throw new BadRequestException({
        code: 400,
        message: 'Merchant ID is available'
      })
    }
  //  console.log('merchantID='+queryData.merchantId);
    const merchantData = {
      merchant_id: queryData.merchantId,
      store_id: queryData.storeId,
      device_id: queryData.deviceId,
      merchant_url: queryData.merchantUrl,
      line_id: queryData.lineId,
      telegram_id: queryData.telegramId,
      email: queryData.email,
      password: crypto.createHash('MD5').update(queryData.password).digest('hex'),
      token: randtoken.generate(256),
      auth_api: randtoken.generate(32),
      secret_key: randtoken.generate(64)
     // callback_url: queryData.callbackUrl,
    };
    const newMerchant = await this.databaseServicve.merchantPiPayRespository.create(merchantData);
    await this.databaseServicve.merchantPiPayRespository.save(newMerchant);
    return 'success';
  }
  async getMerchants(query, page: number = 1, rows: number = 20): Promise<GetMerchantOutput> {
    const skip = (page - 1) * rows;
    const getData = await this.databaseServicve.merchantPiPayRespository.createQueryBuilder('Merchant');
    if (query.merchantId) {
        await getData.andWhere('Merchant.merchant_id LIKE :MerchantId', { MerchantId: `%${query.merchantId}%` });
    }
    
     // Add pagination
    await getData.limit(rows);
    await getData.offset(skip);
    
    return {
      count: await getData.getCount(),
      data: (await getData.getMany()).map(value => ({
          id: value.id,
          merchantId: value.merchant_id,
          storeId: value.store_id,
          deviceId: value.device_id,
          merchantUrl: value.merchant_url,
          lineId: value.line_id,
          telegramId: value.telegram_id,
          email: value.email,
          createdAt: moment(value.createAt).toDate(),
          updatedAt: moment(value.updateAt).toDate(),
      })),
  };
  
  
}
async getMerchantIDs():Promise<any> {
  const merchantData = await this.databaseServicve.merchantPiPayRespository.find({
    select: ["merchant_id"],
  });

  // Tạo danh sách select options từ dữ liệu merchant
  const merchantIDs = merchantData.map(merchant => ({
    merchantId: merchant.merchant_id,
  }));
  return merchantIDs;
}
async getOrders(query, page: number = 1, rows: number = 20): Promise<GetOrderOutput> {
  const skip = (page - 1) * rows;
  const orderData = await this.databaseServicve.orderRespository.createQueryBuilder('Order');
  const type = 'PiPay';
  await orderData.andWhere('Order.type = :Type', { Type: `${type}` });
 if (query.orderId) {
  await orderData.andWhere('Order.order_id LIKE :OrderId', { MerchantId: `%${query.orderId}%` });
}

if (query.merchantId) {
  await orderData.andWhere('Order.merchant_id LIKE :MerchantId', { MerchantId: `%${query.merchantId}%` });
}

if (query.status) {
  await orderData.andWhere('Order.status LIKE :Status', { Status: `%${query.status}%` });
}
if (query.currency) {
  await orderData.andWhere('Order.currency LIKE :Currency', { Status: `%${query.currency}%` });
}
if (query.fromCreateDate && query.toCreateDate) {
  const startDate = moment(query.fromCreateDate + " 00:00:00", "YYYY-MM-DD HH:mm:ss");
  const endDate = moment(query.toCreateDate + " 23:59:59", "YYYY-MM-DD HH:mm:ss");
  await orderData.andWhere('Order.createAt BETWEEN :fromCreateDate AND :toCreateDate',
    {
      fromCreateDate: startDate.toDate(),
      toCreateDate: endDate.toDate(),
    }
  );
} 
// Add pagination
await orderData.limit(rows);
await orderData.offset(skip);
  const orders = (await orderData.getMany()).map(value => ({
      id: value.id,
      merchantId: value.merchant_id,
      orderId: value.order_id,
      amount: value.amount,
      currency: value.currency,
      description: value.description,
      token: value.token,
      customerId: value.customer_id,
      createAt: moment(value.createAt).format('YYYY-MM-DD HH:mm:ss'),
      updateAt: moment(value.updateAt).format('YYYY-MM-DD HH:mm:ss'),
      status: value.status,
      approveAmount: value.approve_amount,
      type: value.type,
      successIndicator: value.success_indicator
    
  }));
 //console.log(orders);
  return {
    count: await orderData.getCount(),
    data: orders
  };
}
  getDescriptionFromStatusCode(statusCode: string): string {
    switch (statusCode) {
      case '0000':
        return 'Success';
      case '0001':
        return 'Failed – Payment Processor is not available';
      case '0003':
        return 'Failed – User login failed';
      case '0004':
        return 'Failed – Payment processor rejected the transaction';
      case '0005':
        return 'Failed – Payment processor did not respond';
      case '0006':
        return 'Failed – A time out happened';
      case '0007':
        return 'Failed - Payment Gateway is not available';
      case '0200':
        return 'Failed - User canceled the transaction';
      default:
        return 'Unknown status code';
    }
  }
  calculateDigest(params: any): string {
    const { mid, orderid, orderAmount } = params;
    const str = `${mid}${orderid}${orderAmount}`;
    console.log('digest====='+str);
    return md5(str);
  }
}