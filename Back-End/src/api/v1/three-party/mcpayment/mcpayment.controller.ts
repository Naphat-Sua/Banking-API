import {Body, Controller, Get, Headers, Post} from '@nestjs/common';
import {McpaymentService} from "./mcpayment.service";
import {OrderInput} from "./dto/order.input";
import {QueryInput} from "./dto/query.input";
import {CreateWithdrawInput} from "./dto/create-withdraw.input";

@Controller('api/v1/3pt/mc')
export class McpaymentController {
    constructor(
        private mcpayment: McpaymentService
    ) {
    }

    @Post('order')
    createOrder(@Body() body: OrderInput, @Headers('authorization') Authorization) {
        return this.mcpayment.createOrder(body, Authorization)
    }

    @Post('query')
    queryOrder(@Body() body: QueryInput, @Headers('authorization') Authorization) {
        return this.mcpayment.queryOrder(body, Authorization)
    }

    @Get('balance')
    getBalance(@Headers('authorization') Authorization) {
        return this.mcpayment.getBalance(Authorization)
    }

    @Post('withdraw')
    createWithdraw(@Body() body: CreateWithdrawInput, @Headers('authorization') Authorization) {
        return this.mcpayment.createWithdraw(body, Authorization)
    }
}
