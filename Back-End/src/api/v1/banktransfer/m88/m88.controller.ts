import {Body, Controller, Get, Headers, Post} from '@nestjs/common';
import {BanktransferService} from "../banktransfer.service";
import {ApiCreatedResponse} from "@nestjs/swagger";
import {QueryWithdrawOutput} from "../dto/query-withdraw.output";
import {QueryDepositInput} from "../dto/query-deposit.input";
import {QueryDepositOutput} from "../dto/query-deposit.output";
import {QueryWithdrawInput} from "../dto/query-withdraw.input";
import {CreateDepositAutoqrcodeOutput} from "../dto/create-deposit-autoqrcode.output";
import {CreateDepositTransferOutput} from "../dto/create-deposit-transfer.output";
import {CreateWithdrawOutput} from "../dto/create-withdraw.output";
import {CreateDepositAutoqrcodeInput} from "./dto/create-deposit-autoqrcode.input";
import {CreateDepositTransferInput} from "./dto/create-deposit-transfer.input";
import {CreateWithdrawInput} from "./dto/create-withdraw.input";
import {M88Service} from "./m88.service";


@Controller('api/v/m88')
export class M88Controller {
    constructor(
        private banktransferService: BanktransferService,
        private m88Service: M88Service
    ) {
    }

    @Get('balance')
    checkBalance(@Headers('authorization') Authorization) {
        return this.banktransferService.checkBalance(Authorization)
    }

    @ApiCreatedResponse({
        type: QueryDepositOutput
    })
    @Post('query/deposit')
    queryDeposit(@Body() body: QueryDepositInput, @Headers('authorization') Authorization): Promise<QueryDepositOutput> {
        return this.banktransferService.queryDeposit(body, Authorization)
    }

    @ApiCreatedResponse({
        type: QueryWithdrawOutput
    })
    @Post('query/withdraw')
    queryWithdraw(@Body() body: QueryWithdrawInput, @Headers('authorization') Authorization): Promise<QueryWithdrawOutput> {
        return this.banktransferService.queryWithdraw(body, Authorization)
    }

    @ApiCreatedResponse({
        type: CreateDepositAutoqrcodeOutput
    })
    @Post('autoqrcode')
    createDepositAutoQrcode(@Body() body: CreateDepositAutoqrcodeInput, @Headers('authorization') Authorization): Promise<CreateDepositAutoqrcodeOutput> {
        return this.m88Service.createOrderDepositQRcode(body, Authorization)
    }

    @ApiCreatedResponse({
        type: CreateDepositTransferOutput
    })
    @Post('deposit')
    createDepositTransfer(@Body() body: CreateDepositTransferInput, @Headers('authorization') Authorization): Promise<CreateDepositTransferOutput> {
        return this.m88Service.createDepositTransfer(body, Authorization)
    }

    @ApiCreatedResponse({
        type: CreateWithdrawOutput
    })
    @Post('withdraw')
    createWithdraw(@Body() body: CreateWithdrawInput, @Headers('authorization') Authorization): Promise<CreateWithdrawOutput> {
        return this.m88Service.createWithdraw(body, Authorization)
    }
}
