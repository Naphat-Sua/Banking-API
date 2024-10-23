import {Injectable, InternalServerErrorException, Logger} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import * as request from 'request'
import CurrencyList from 'currency-list'
import {ExportService} from "./export/export.service";

@Injectable()
export class McpaymentService {
    private baseURLMcPayRedirectLive: string
    private baseURLMcPayRedirectSandbox: string

    constructor(
        private config: ConfigService,
        public exportFile: ExportService
    ) {
        this.baseURLMcPayRedirectLive = 'https://gw2.mcpayment.net'
        this.baseURLMcPayRedirectSandbox = 'https://gw2.sandbox.mcpayment.net'
    }

    getRequest(options) {
        return new Promise(resolve => {
            request({
                ...options
            }, (err, resp, body) => {
                if (err || !body) {
                    throw new InternalServerErrorException({
                        code: 500,
                        message: err ? err : !body ? 'Not body response provider' : null
                    })
                }
                if (resp) {
                    Logger.debug(`Gen link paypage Mcpayment statusCode ${resp.statusCode}`)
                }
                if (body) {
                    resolve(body)
                }
            })
        })
    }

    async getLinkPaypage(mid, env, currency, amount, token) {
        const getCurrency = CurrencyList.get(currency)
        const calAmount = getCurrency.decimal_digits === 1 ? 10 : getCurrency.decimal_digits === 2 ? 100 : getCurrency.decimal_digits === 3 ? 1000 : getCurrency.decimal_digits === 4 ? 10000 : 1
        const result = await this.getRequest({
            method: 'POST',
            url: `${env === 'LIVE' ? this.baseURLMcPayRedirectLive : this.baseURLMcPayRedirectSandbox}/api/v6/payment`,
            form: {
                mcptid: mid,
                currency,
                referenceNo: `${token}`,
                totalAmount: amount * calAmount,
                returnUrl: `${this.config.get<string>('baseURL')}/callback/mcpayment/redirect/card`,
                statusUrl: `${this.config.get<string>('baseURL')}/callback/mcpayment/statusurl/card`,
                tokenize: 'N',
                itemDetail: 'N'
            }
        })
        return result
    }
}
