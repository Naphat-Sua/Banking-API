import {Body, Controller, Get, Headers, Post} from '@nestjs/common';
import {BanktransferService} from "../banktransfer.service";
import {HuayService} from "./huay.service";
import {ApiCreatedResponse, ApiHeader, ApiOkResponse} from "@nestjs/swagger";
import {QueryDepositOutput} from "../dto/query-deposit.output";
import {QueryDepositInput} from "../dto/query-deposit.input";
import {QueryWithdrawOutput} from "../dto/query-withdraw.output";
import {QueryWithdrawInput} from "../dto/query-withdraw.input";
import {CreateDepositAutoqrcodeOutput} from "./dto/create-deposit-autoqrcode.output";
import {CreateDepositAutoqrcodeInput} from "../dto/create-deposit-autoqrcode.input";
import {CreateDepositTransferOutput} from "./dto/create-deposit-transfer.output";
import {CreateDepositTransferInput} from "./dto/create-deposit-transfer.input";
import {CreateWithdrawOutput} from "../dto/create-withdraw.output";
import {CreateWithdrawInput} from "./dto/create-withdraw.input";
import {CheckBalanceOutput} from "../dto/check-balance.output";

@ApiHeader({
    name: 'authorization'
})
@Controller('api/v1/unipay')
export class HuayController {
    constructor(
        private banktransferService: BanktransferService,
        private huaySerivce: HuayService
    ) {
    }

    @ApiOkResponse({
        type: CheckBalanceOutput
    })
    @Get('balance')
    checkBalance(@Headers('authorization') Authorization): Promise<CheckBalanceOutput> {
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
        return this.huaySerivce.createDepositAutoQrcode(body, Authorization)
    }

    @ApiCreatedResponse({
        type: CreateDepositTransferOutput
    })
    @Post('deposit')
    createDepositTransfer(@Body() body: CreateDepositTransferInput, @Headers('authorization') Authorization): Promise<CreateDepositTransferOutput> {
        return this.huaySerivce.createDepositTransfer(body, Authorization)
    }

    @ApiCreatedResponse({
        type: CreateWithdrawOutput
    })
    @Post('withdraw')
    createWithdraw(@Body() body: CreateWithdrawInput, @Headers('authorization') Authorization): Promise<CreateWithdrawOutput> {
        return this.banktransferService.createOrderWithdraw(body, Authorization)
    }

}
