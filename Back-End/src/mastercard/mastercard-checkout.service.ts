import { Injectable, Body, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {DatabaseService} from "../database/database.service";
import {GetMerchantOutput} from "../mastercard/dto/merchant.output";
import {GetOrderOutput} from "./dto/order-report.output ";
import {ShareService} from "../share/share.service";
import axios from 'axios';
import * as randtoken from 'rand-token'
import * as crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';
@Injectable()
export class MastercardService {
  constructor(
    private config: ConfigService,
    private databaseServicve: DatabaseService,
    private shareService: ShareService
    )
     {}
    
    generateOrderID(): string {
      return uuidv4(); // Sử dụng hàm v4 để tạo mã UUID ngẫu nhiên
    }   
  async initiateCheckout(body, authorizationHeader): Promise<any> {
    const [merchantId, apiKeyH] = this.parseBasicAuth(authorizationHeader);

    console.log('merchantId:', merchantId);
    console.log('API Key:', apiKeyH);
    //const merchantId = this.config.get<string>('mastercardMerchantID');
    //const merchantId = body.merchantId;
    const merchantInfo = await this.databaseServicve.merchantRespository.findOne({
      where: {
        merchant_id: merchantId,
        api_key: apiKeyH // Thêm điều kiện kiểm tra api_key
      }
    });
    
    if (!merchantInfo) {
      throw new Error(`Merchant not found or API key is invalid.`);
    }
    
    let isHideBillingAddress = body.hideBilling;
    const orderId = this.generateOrderID();
    if(!isHideBillingAddress){
      isHideBillingAddress = 'HIDE';
    }
    // const apiKey = this.config.get<string>('mastercardApiKey');
    // const marchantName = '';
    // const merchantUrl = this.config.get<string>('mastercardMerchantURL');
    
    // const url = `${this.config.get<string>('mastercardApiKey')}/${merchantId}/session`;

    const merchantCallbackUrl = this.config.get<string>('mastercardReturnURL')
    const apiKey = merchantInfo.api_key;
    const marchantName = merchantInfo.merchant_name;
    const merchantUrl = merchantInfo.merchant_url;
   // const merchantCallbackUrl = merchantInfo.callback_url;
    const url = `${this.config.get<string>('mastercardGatewayURL')}/${merchantId}/session`;

    const data = {
      "apiOperation": "INITIATE_CHECKOUT",
      "interaction": {
        "operation": "AUTHORIZE",
       "merchant": {
        "name": marchantName,
         "url": `${merchantUrl}`
       },
        "displayControl": {
          "billingAddress": isHideBillingAddress
        },
       "returnUrl": `${merchantCallbackUrl}`
      },
      "order": {
        "id": orderId,
        "amount":  body.amount,
        "currency": body.currency,
       "description": body.description
      }
    };
   // console.log('data=',data);
    const username = `merchant.${merchantId}`;
    const encodedData = JSON.stringify(data);
    console.log(encodedData); 
    const headers = {
      'Authorization': `Basic ${Buffer.from(`${username}:${apiKey}`).toString('base64')}`,
    };
    const response = await axios.post(url, encodedData, { headers });
    const sessionId = response.data.session.id;
    const successIndicator = response.data.successIndicator;
    console.log('sessionID:'+sessionId);
    //check DB
    const existingOrder = await this.databaseServicve.orderRespository.findOne({ where: { order_id: orderId } });
    console.log('check order mastercard='+existingOrder);
    if (existingOrder) {
      throw new BadRequestException({
      code: 400,
      message: 'You can not use orderid'
    })
  }
  
    //save DB
    const orderData = {
      merchant_id: merchantId,
      order_id: orderId,
      amount: body.amount,
      currency: body.currency,
      status: 'wait',
      type: 'CreditCard',
      description: body.description,
      success_indicator: successIndicator,
      session_id: sessionId
    }
    try {
      const newOrder = this.databaseServicve.orderRespository.create(orderData);
    this.databaseServicve.orderRespository.save(newOrder);
    } catch (error) {
      throw new Error(`Mastercard Start Transaction Failed: ${error.message}`);
    }
    return sessionId;
  
  }
 
  async confirmPayment(queryData, response): Promise<any> {
    try {
     // const orderId = queryData.orderId;
    //  const merchantId = queryData.merchantId;
      const resultIndicator = queryData.resultIndicator;
      console.log('******CONFIRM PAYMENT MASTER CARD*******')
    //  console.log('orderID ================='+orderId)
      console.log('resultIndicator ================='+resultIndicator)
      try {
        // Tìm bản ghi có order_id tương ứng trong cơ sở dữ liệu
        const existingOrder = await this.databaseServicve.orderRespository.findOne({
          where: {
            success_indicator: resultIndicator
          },
        });
      if (!existingOrder) {
          // Nếu không tìm thấy bản ghi, thông báo lỗi và không cập nhật gì cả
          throw new Error(`Order with orderID not found.`);
        }
      //if(resultIndicator === existingOrder.success_indicator){
        // Cập nhật trạng thái của bản ghi thành 'cancel'
        existingOrder.status = 'success';
        existingOrder.approve_amount = existingOrder.amount;
        await this.databaseServicve.orderRespository.save(existingOrder);
        //notify to merchant
     // }
      } catch (error) {
        // Xử lý lỗi
        throw new Error(`Mastercard Cancel Transaction Failed: ${error.message}`);
      }
      
     // response.redirect(this.config.get<string>('pipayHomePageURL'));
    } catch (error) {
      throw new Error(`Mastercard Verify Transaction Failed: ${error.message}`);
    }
  }
  async addMerchant(queryData): Promise<string> {
    const existingMerchant= await this.databaseServicve.merchantRespository.findOne({ where: { merchant_id: queryData.merchantId } });
      
    if (existingMerchant) {
      throw new BadRequestException({
        code: 400,
        message: 'Merchant ID is available'
      })
    }
  //  console.log('merchantID='+queryData.merchantId);
    const merchantData = {
      merchant_id: queryData.merchantId,
      merchant_name: queryData.merchantName,
      api_key: queryData.apiKey,
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
    const newMerchant = await this.databaseServicve.merchantRespository.create(merchantData);
    await this.databaseServicve.merchantRespository.save(newMerchant);
    //eamil
    const getAdmin = await this.databaseServicve.adminRepository.find()
    const cutAdmin = await getAdmin.map(value => value.email)
    this.shareService.emailService.createMerchant(merchantData.email, merchantData.merchant_id, merchantData.password, 
      merchantData.secret_key,merchantData.auth_api, cutAdmin)
    return 'success';
  }
  async getMerchants(query, page: number = 1, rows: number = 20): Promise<GetMerchantOutput> {
    const skip = (page - 1) * rows;
    const getData = await this.databaseServicve.merchantRespository.createQueryBuilder('Merchant');

    // Left join with related entities (if needed)
    //await getData.leftJoinAndSelect('Merchant.someRelatedEntity', 'RelatedEntity', 'Merchant.someRelatedEntity IS NOT NULL');

    // Add where conditions
    //await getData.where('Merchant.isDelete = :isDelete', { isDelete: false });
  //  console.log('merchant ID='+query.merchantId);
    if (query.merchantId) {
        await getData.andWhere('Merchant.merchant_id LIKE :MerchantId', { MerchantId: `%${query.merchantId}%` });
    }
    
    if (query.merchantName) {
        await getData.andWhere('Merchant.merchant_name LIKE :MerchantName', { MerchantName: `%${query.merchantName}%` });
    }
    
    if (query.apiKey) {
        await getData.andWhere('Merchant.api_key LIKE :ApiKey', { ApiKey: `%${query.apiKey}%` });
    }
    
    // Add pagination
    await getData.limit(rows);
    await getData.offset(skip);
    
    return {
      count: await getData.getCount(),
      data: (await getData.getMany()).map(value => ({
          id: value.id,
          merchantId: value.merchant_id,
          merchantName: value.merchant_name,
          apiKey: value.api_key,
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
  const merchantData = await this.databaseServicve.merchantRespository.find({
    select: ["merchant_id", "api_key", "merchant_name"],
  });

  // Tạo danh sách select options từ dữ liệu merchant
  const merchantIDs = merchantData.map(merchant => ({
    merchantId: merchant.merchant_id,
    apiKey: merchant.api_key,
    merchantName: merchant.merchant_name,
  }));
  return merchantIDs;
}
async getOrders(query, page: number = 1, rows: number = 20): Promise<GetOrderOutput> {
  const skip = (page - 1) * rows;
  const orderData = await this.databaseServicve.orderRespository.createQueryBuilder('Order');
  const type = 'CreditCard';
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
  console.log('from date:', startDate.toDate());
  console.log('to date:', endDate.toDate());  
  await orderData.andWhere('Order.createAt BETWEEN :fromCreateDate AND :toCreateDate',
    {
      fromCreateDate: startDate.toDate(),
      toCreateDate: endDate.toDate(),
    }
  );
} 
// else if (query.fromCreateDate) {
//   // Nếu chỉ có giá trị fromCreateDate được cung cấp
//   await orderData.andWhere('Order.createAt >= :fromCreateDate', {
//     fromCreateDate: query.fromCreateDate,
//   });
// } else if (query.toCreateDate) {
//   // Nếu chỉ có giá trị toCreateDate được cung cấp
//   await orderData.andWhere('Order.createAt <= :toCreateDate', {
//     toCreateDate: query.toCreateDate,
//   });
// }
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
  parseBasicAuth(authHeader: string): [string, string] {
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return null; // Header không hợp lệ
    }
    const encodedCredentials = authHeader.split(' ')[1];
    const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString();
    const [username, apiKey] = decodedCredentials.split(':');
    return [username, apiKey];
  }
}
