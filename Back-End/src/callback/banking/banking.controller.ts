import {Body, Controller, Headers, Patch, Post} from '@nestjs/common';
import {BankingService} from "./banking.service";

@Controller('callback/banking')
export class BankingController {
    constructor(
        private banking: BankingService
    ) {
    }

    @Post('deposit')
    callbackDeposit(@Headers('x-api-key') token: number, @Body() body) {
        this.banking.autoDeposit(token, body)
        return 'OK'
    }

    @Patch('withdraw')
    callbackWithdraw(@Body() body) {
        return this.banking.autoWithdraw(body)
    }

    @Patch('balance')
    updateBalance(@Headers('x-api-key') token: number, @Body() body) {
        return this.banking.updateBalanceAccount(token, body)
    }
}
