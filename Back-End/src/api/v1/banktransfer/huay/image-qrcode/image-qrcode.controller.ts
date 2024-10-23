import {Controller, Get, Query, Res} from '@nestjs/common';
import {ApiOkResponse, ApiQuery} from "@nestjs/swagger";
import {BanktransferService} from "../../banktransfer.service";

@Controller('api/v1/unipay')
export class ImageQrcodeController {

    constructor(
        private banktransferService: BanktransferService
    ) {
    }

    @ApiQuery({
        name: 'token',
        required: true
    })
    @Get('image/qrcode')
    async CreateImage(@Query('token') token, @Res() res) {
        const Buffer = await this.banktransferService.genImageQRcode(token)
        res.set('Content-Type', 'image/png')
        res.send(Buffer)
    }
}
