import {Body, Controller, Post, Query, Res} from '@nestjs/common';
import {McpaymentService} from "./mcpayment.service";

@Controller('callback/mcpayment')
export class McpaymentController {
    constructor(
        private mcpayment: McpaymentService
    ) {
    }

    @Post('statusurl/card')
    callbackCardUpdate(@Body() body, @Query() query) {
        return this.mcpayment.callbackCardUpdate(body, query)
    }

    @Post('redirect/card')
    redirectCardToFrontend(@Res() res, @Body() body) {
        return this.mcpayment.redirectCard(res, body)
    }

    @Post('statusurl')
    callbackUpdate(@Body() body, @Query() query) {
        return this.mcpayment.callbackUpdate(query, body)
    }

    @Post('redirect')
    redirectToFrontend(@Res() res, @Body() body) {
        return this.mcpayment.redirect(res, body)
    }
}
