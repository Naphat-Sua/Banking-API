import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {McpaymentService} from "./mcpayment.service";

@Controller('paymentpage/mcpayment')
export class McpaymentController {
    constructor(
        private mcpayment: McpaymentService
    ) {
    }

    @Get('checkorder')
    getOrderByToken(@Query('id') token) {
        return this.mcpayment.getToken(token)
    }

    @Get('paymentpage')
    getTokenByRedirectPaypage(@Query('id') token) {
        return this.mcpayment.getTokenPayRedirect(token)
    }

    @Get('dopayment')
    getTokenByDopayment(@Query('id') token) {
        return this.mcpayment.getTokenDoPayment(token)
    }

    @Post('return')
    getReturn(@Body() body) {
        return this.mcpayment.getReturn(body)
    }

}
