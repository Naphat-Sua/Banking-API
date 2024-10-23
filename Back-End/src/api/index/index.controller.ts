import {Body, Controller, Get, Headers, Post, Query, Res} from '@nestjs/common';
import {ApiCreatedResponse, ApiHeader, ApiQuery} from "@nestjs/swagger";
import {IndexService} from "./index.service";
import {CreateDepositAutoqrcodeInput} from "./dto/create-deposit-autoqrcode.input";
import {CreateDepositAutoqrcodeOutput} from "./dto/create-deposit-autoqrcode.output";
import {CreateDepositTransferInput} from "./dto/create-deposit-transfer.input";
import {CreateDepositTransferOutput} from "./dto/create-deposit-transfer.output";
import {CreateWithdrawInput} from "./dto/create-withdraw.input";
import {CreateWithdrawOutput} from "./dto/create-withdraw.output";

@Controller('api')
export class IndexController {
    constructor(
        private indexService: IndexService
    ) {
    }

    @ApiQuery({
        name: 'token',
        required: true
    })
    @Get('image/qrcode')
    async CreateImage(@Query('token') token, @Res() res) {
        const Buffer = await this.indexService.genImageQRcode(token)
        res.set('Content-Type', 'image/png')
        res.send(Buffer)
    }

    @ApiHeader({
        name: 'authorization'
    })
    @ApiCreatedResponse({
        type: CreateDepositAutoqrcodeOutput
    })
    @Post('autoqrcode')
    genAutoQRcode(@Body() body: CreateDepositAutoqrcodeInput, @Headers('authorization') Authorization): Promise<CreateDepositAutoqrcodeOutput> {
        return this.indexService.createOrderDepositQrcode(body, Authorization)
    }

    @ApiHeader({
        name: 'authorization'
    })
    @ApiCreatedResponse({
        type: CreateDepositTransferOutput
    })
    @Post('deposit')
    createOrderDeposit(@Body() body: CreateDepositTransferInput, @Headers('authorization') Authorization): Promise<CreateDepositTransferOutput> {
        return this.indexService.createOrderDeposit(body, Authorization)
    }

    @ApiHeader({
        name: 'authorization'
    })
    @ApiCreatedResponse({
        type: CreateWithdrawInput
    })
    @Post('withdraw')
    createOrderWithdraw(@Body() body: CreateWithdrawInput, @Headers('authorization') Authorization): Promise<CreateWithdrawOutput> {
        return this.indexService.createOrderWithdraw(body, Authorization)
    }


}
