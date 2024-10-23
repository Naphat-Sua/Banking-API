import {Injectable, InternalServerErrorException, Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import axios from 'axios';
import * as request from 'request';
import {v4 as uuidv4} from 'uuid';
import * as crypto from 'crypto';

import {DatabaseService} from '../database/database.service';
import {DirepayTransactionType} from '../entities/DirepayTransaction';
import {
  ExchangeRateDto,
  ExchangeRateResponse,
  PaymentDto,
  PaymentResponse,
  WithdrawCallbackDto,
  WithdrawDto,
  WithdrawResponse
} from './dto';

@Injectable()
export class DirePayService {

  constructor(
    private config: ConfigService,
    private databaseService: DatabaseService
  ) {
  }

  private readonly apiUrl = 'http://api.uat.direpay.app';
  private readonly checkOutUrl = 'https://payment.uat.direpay.app/checkout';
  private readonly apiEmail = 'pliromi@direpay.io'; // Replace with your DirePay API key
  private readonly apiPassword = 'ZWXAXKz265';
  private readonly secretIdentifier = 'MRaAFTR'; // Replace with your secret identifier
  private readonly platformIdentifier = 'pliromi';
  private readonly callbackUrl = this.config.get<string>('direPayCallBack');
  private readonly proxyIp = this.config.get<string>('direPayProxy');
  private readonly proxyPort = this.config.get<number>('direPayPort');
  private readonly PROXY_OPTIONS = {
    proxy: `http://${this.proxyIp}:${this.proxyPort}`, // Địa chỉ IP và Port của proxy
  }
  private readonly paymentCallbackUrl = `${this.callbackUrl}/direpay/merchant/paymentCallback`
  private readonly withdrawCallbackUrl = `${this.callbackUrl}/direpay/merchant/withdrawCallback`

  private generateOrderID(): string {
    return uuidv4(); // Sử dụng hàm v4 để tạo mã UUID ngẫu nhiên
  }

  private getRequest<T>(options: any): Promise<T> {
    return new Promise(resolve => {
      request({
        ...options,
      }, (err: any, resp: any, body: any) => {
        if (err || !body) {
          throw new InternalServerErrorException({
            code: 500,
            message: err ? err : !body ? 'Not body response provider' : null,
          });
        }
        if (resp) {
          Logger.debug(`statusCode ${resp.statusCode}`);
        }
        if (body) {
          resolve(body);
        }
      });
    });
  }

  async createPaymentCheckout(data: PaymentDto): Promise<any> {
    // Step 1: Prepare the necessary data in JSON format
    const txid = this.generateTransactionID('DPCO');
    const jsonData = {
      txid,
      currency: data.currency,
      amount: data.amount,
      token: data.token,
      callback_url: this.paymentCallbackUrl,
      customer_uid: this.generateOrderID(),
      customer_email: data.customer_email || '', // Optional
      customer_reference_id: data.customer_reference_id || '', // Optional
    };
    console.log('json data=', jsonData);

    // Tạo một instance Axios với cấu hình proxy
    const axiosInstance = axios.create({
      baseURL: this.checkOutUrl,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Thiết lập Content-Type
      },
    });
    // Step 2: Encrypt the data
    const encryptedData = this.encryptData(JSON.stringify(jsonData));
    // Step 3: Send a POST request to DirePay API to get the Checkout Page
    try {
      const response = await axiosInstance.post('/checkout', {
        data: encryptedData,
        platform: this.platformIdentifier, // Replace with your platform identifier
        lang: 'en', // Optional language
      });
      // Handle the response, which should contain the Checkout Page or error information
      return response.data;
    } catch (error) {
      console.log(error);
    }

  }

  async authenticate(): Promise<string> {
    try {
      const authData = {
        email: this.apiEmail,
        password: this.apiPassword,
      };
      const response = await axios.post(`${this.apiUrl}/api/login`, authData);
      return response.data.access_token;
    } catch (error) {
      throw error;
    }
  }

  async createPayment(orderData: PaymentDto): Promise<any> {
    const token = await this.authenticate();
    const txid = this.generateTransactionID('DPPM');
    const itemData = [
      {
        name: 'Order',
        item_id: this.generateRandomItemId(8),
        description: orderData.description,
        amount: orderData.amount,
        quantity: '1',
      },
    ];
    const paymentData = {
      command: 'payment',
      line_items: itemData,
      txid,
      currency: orderData.currency,
      token: orderData.token, // Thay đổi loại token theo yêu cầu của bạn
      callback_url: `${this.paymentCallbackUrl}/${txid}`,
      customer_uid: this.generateOrderID(),
      customer_email: '',
      client_reference_id: '',
      expired_at: '',
      hashCode: this.generateHashcode('payment' + this.secretIdentifier),
      wallet_type: 'shared', // Hoặc 'shared' nếu bạn muốn sử dụng shared wallet
    };
    console.log('paymentData', paymentData)
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const result = await this.getRequest<string>({
      method: 'POST',
      url: `${this.apiUrl}/api/callBack`,
      form: paymentData,
      headers,
      ...this.PROXY_OPTIONS,
    });
    const response: PaymentResponse = JSON.parse(result);
    const direpayTransaction = this.databaseService.direpayTransactionRepository.create({
      txid: response.txid,
      customer_uid: response.customer_uid,
      amount: response.invoice_amount,
      currency: response.invoice_currency,
      token_amount: parseFloat(response.payment_amount),
      token_code: response.payment_token,
      rates: response.rates,
      payment_address: response.payment_address,
      expiredAt: response.expired_at,
      type: DirepayTransactionType.PAYMENT,
      status: null,
      request: paymentData,
      response
    })
    await this.databaseService.direpayTransactionRepository.save(direpayTransaction)
    return response;
  }

  async getExchangeRate(rateData: ExchangeRateDto): Promise<ExchangeRateResponse> {
    const token = await this.authenticate();
    // const item = JSON.stringify(itemData);
    const ratesData = {
      command: 'rates',
      from_currency: rateData.fromCurrency,
      to_currency: rateData.toCurrency,
      amount: rateData.amount, // Thay đổi loại token theo yêu cầu của bạn
      type: rateData.type, // Buy or Sell
    };
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const result = await this.getRequest<string>({
      method: 'POST',
      url: `${this.apiUrl}/api/callBack`,
      form: ratesData,
      headers,
      ...this.PROXY_OPTIONS,
    });
    return JSON.parse(result);
  }

  async withdraw(withdrawData: WithdrawDto): Promise<any> {
    // Get exchange rate
    const rateResponse = await this.getExchangeRate({
      amount: withdrawData.amount.toString(),
      fromCurrency: withdrawData.currency,
      toCurrency: withdrawData.token,
      type: 'SELL'
    })
    const token = await this.authenticate();
    const txid = this.generateTransactionID('DPWD');
    const withdrawBody = {
      command: 'partner_withdraw',
      hashCode: this.generateHashcode('partner_withdraw' + this.secretIdentifier),
      txid,
      amount: withdrawData.amount,
      currency: withdrawData.currency,
      withdrawal_amount: rateResponse.amount,
      withdrawal_token: withdrawData.token,
      address: withdrawData.address,
      callback_url: this.withdrawCallbackUrl,
      customer_uid: this.generateOrderID(),
      gas_price: '',
    };
    console.log('withdrawData', withdrawData)
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const result = await this.getRequest<string>({
      method: 'POST',
      url: `${this.apiUrl}/api/callBack`,
      form: withdrawBody,
      headers,
      ...this.PROXY_OPTIONS,
    });
    const response: WithdrawResponse = JSON.parse(result)
    const direpayTransaction = this.databaseService.direpayTransactionRepository.create({
      txid: response.txid,
      customer_uid: withdrawBody.customer_uid,
      amount: withdrawBody.amount,
      currency: withdrawBody.currency,
      token_amount: parseFloat(response.amount),
      token_code: response.token,
      rates: null,
      payment_address: withdrawBody.address,
      expiredAt: null,
      type: DirepayTransactionType.WITHDRAW,
      status: response.status,
      request: withdrawBody,
      response
    })
    await this.databaseService.direpayTransactionRepository.save(direpayTransaction)
    return response;
  }

  async handleCallback(callbackData: any, signature: string, res: any) {
    try {
      const sortedKeys = Object.keys(callbackData).sort();
      const paramsString = sortedKeys.map((key) => `${key}=${callbackData[key]}`).join('&');
      const calculatedSignature = crypto.createHash('md5')
        .update(this.secretIdentifier + paramsString)
        .digest('hex');
      console.log('signature from header===', signature);
      console.log('signature from body  ===', calculatedSignature);
      if (signature !== calculatedSignature) {
        return res.status(400).send('false');
      }
      const txData = await this.databaseService.direpayTransactionRepository.findOne({txid: callbackData.txid})
      if (!txData || txData.status === 'completed' || txData.status === 'expired') {
        res.status(200).send('true')
      }
      txData.callback_response = callbackData
      txData.status = callbackData.status
      txData.direpay_id = callbackData.direpay_id ?? null
      txData.tx_hash = callbackData.tx_hash ?? null
      await this.databaseService.direpayTransactionRepository.save(txData)
      // if (callbackData.status === 'completed') {
      //   txData.status = DirepayTransactionStatus.COMPLETED
      //   // update status orfer
      // } else if (callbackData.status === 'expired') {
      //   txData.status = DirepayTransactionStatus.EXPIRED
      // } else if (callbackData.status === 'too_little') {
      //   txData.status = DirepayTransactionStatus.TOO_LITTLE
      // } else if (callbackData.status === 'too_much') {
      //   txData.status = DirepayTransactionStatus.TOO_MUCH
      // }
      res.status(200).send('true');
    } catch (error) {
      console.error('Error handling callback:', error);
      res.status(500).send('false');
    }
  }

  async handleWithdrawCallback(callbackData: WithdrawCallbackDto, signature: string, res: any) {
    try {
      const sortedKeys = Object.keys(callbackData).sort();
      const paramsString = sortedKeys.map((key) => `${key}=${callbackData[key]}`).join('&');
      const calculatedSignature = crypto.createHash('md5')
        .update(this.secretIdentifier + paramsString)
        .digest('hex');
      console.log('signature from header===', signature);
      console.log('signature from body===', signature);
      if (signature !== calculatedSignature) {
        return res.status(400).send('false');
      }
      const txData = await this.databaseService.direpayTransactionRepository.findOne({txid: callbackData.txid})
      txData.callback_response = callbackData
      txData.status = callbackData.status
      txData.direpay_id = callbackData.direpay_id ?? null
      txData.tx_hash = callbackData.tx_hash ?? null
      txData.fee = parseFloat(callbackData.fee)
      txData.fee_usd = parseFloat(callbackData.fee_usd)
      await this.databaseService.direpayTransactionRepository.save(txData)
      // // Xử lý callback dựa trên trạng thái và dữ liệu callbackData ở đây
      // if (callbackData.status === 'completed') {
      //   // Xử lý trạng thái thanh toán thành công
      // } else if (callbackData.status === 'expired') {
      //   // Xử lý trạng thái thanh toán đã hết hạn
      // }
      res.status(200).send('true');
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Error handling callback:', error);

      // Gửi phản hồi lỗi
      res.status(500).send('Error');
    }
  }

  async getTransactionStatus(txid: string) {
    const token = await this.authenticate();
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const body = {
      command: 'transaction_status',
      txid,
      hashCode: this.generateHashcode('transaction_status' + this.secretIdentifier),
    }
    const response = await this.getRequest<string>({
      method: 'POST',
      url: `${this.apiUrl}/api/callBack`,
      form: body,
      headers,
      ...this.PROXY_OPTIONS,
    });
    return JSON.parse(response)
  }

  private generateHashcode(dataToHash: string): string {
    return crypto.createHash('md5').update(dataToHash).digest('hex');
  }

  private encryptData(data: string): string {
    // Đảm bảo secret identifier không quá 16 ký tự
    const passphrase = this.truncateSecret(this.secretIdentifier);

    // Tạo một Initialization Vector (IV) từ passphrase
    const iv = Buffer.from(passphrase, 'utf8');

    // Tạo một cipher object với AES-128-CBC và IV
    const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(passphrase), iv);

    // Mã hóa dữ liệu bằng cipher object
    let encryptedData = cipher.update(data, 'utf8', 'base64');
    encryptedData += cipher.final('base64');
    console.log('encrypt===', encryptedData);
    return encryptedData;
  }

  generateTransactionID(prifix) {
    const length = 19; // Độ dài của transactionID
    let transactionID = '';

    // Tạo chuỗi ngẫu nhiên bằng cách thêm các số từ 0 đến 9 vào transactionID
    for (let i = 0; i < length; i++) {
      const randomDigit = Math.floor(Math.random() * 10);
      transactionID += randomDigit;
    }

    return `${prifix}${transactionID}`;
  }

  public decryptData(encryptedData: string): string {
    // Đảm bảo secret identifier không quá 16 ký tự
    const passphrase = this.truncateSecret(this.secretIdentifier);

    // Tạo một Initialization Vector (IV) từ passphrase
    const iv = Buffer.from(passphrase, 'utf8');

    // Tạo một decipher object với AES-128-CBC và IV
    const decipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(passphrase), iv);

    // Giải mã dữ liệu bằng decipher object
    let decryptedData = decipher.update(encryptedData, 'base64', 'utf8');
    decryptedData += decipher.final('utf8');

    return decryptedData;
  }

  private truncateSecret(secret: string): string {
    // Đảm bảo secret identifier có đúng 16 ký tự
    if (secret.length > 16) {
      return secret.slice(0, 16);
    } else if (secret.length < 16) {
      while (secret.length < 16) {
        secret += '0';
      }
    }
    // console.log('secret=',secret);
    return secret;
  }

  private generateRandomItemId(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // const length = 8; // Độ dài mong muốn của item_id
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }
}
