import {Injectable, Logger} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import * as request from 'request'

@Injectable()
export class WebshareioService {

    private apikey: string

    constructor(
        private configService: ConfigService
    ) {
        this.apikey = this.configService.get<string>('proxyipkey')
    }

    async getProxy() {
        let getData = null
        try{
            getData = await this.requestAPI()
        }catch (e) {
            getData = null
        }
        let result = []
        if (getData) {
            const cutProxyIp = await getData.results.filter(value => value.valid)
            result = await cutProxyIp.map(value => {
                return `http://${value.username}:${value.password}@${value.proxy_address}:${value.ports.http}`
            })
        }
        return result
    }

    requestAPI(): Promise<any> {
        return new Promise((resolve, reject) => {
            request({
                url: 'https://proxy.webshare.io/api/proxy/list/',
                method: 'GET',
                headers: {
                    Authorization: this.apikey
                },
                json: true
            }, (err, resp, body) => {
                if (err) {
                    Logger.error(err)
                    reject(err)
                }
                if (body) {
                    resolve(body)
                }
            })
        })
    }
}
