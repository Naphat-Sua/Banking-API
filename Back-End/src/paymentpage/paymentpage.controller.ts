import {Body, Controller, Get, Patch, Query, Res} from '@nestjs/common';
import {PaymentpageService} from "./paymentpage.service";

@Controller('paymentpage')
export class PaymentpageController {
    constructor(
        private paymentpageService: PaymentpageService
    ) {
    }

    @Get('')
    getQuery(@Query('token') token) {
        return this.paymentpageService.getQuery(token)
    }

    @Patch('update')
    updateBank(@Query('token') token, @Body() body) {
        return this.paymentpageService.updateBank(token, body)
    }


    @Get('image/qrcode')
    async genImageQRcode(@Query('token') token, @Res() res) {
        const Buffer = await this.paymentpageService.genImageQRcode(token)
        res.set('Content-Type', 'image/png')
        res.send(Buffer)
    }

}
