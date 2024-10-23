import {Body, Controller, Get, Headers, Ip, Post, Req, UseGuards} from '@nestjs/common';
import {ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ErrorOutput} from "../dto/Error.output";
import {CustomerService} from "./customer.service";
import {AuthGuard} from "@nestjs/passport";
import {CustomerGuard} from "../auth/Customer.guard";

@ApiTags('Customer')
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('customer')
export class CustomerController {
    constructor(
        private customerService: CustomerService
    ) {
    }

    @Get('checkauth')
    @UseGuards(AuthGuard(), CustomerGuard)
    checkAuth(@Req() req) {
        return {
            status: true
        }
    }

    @Get('profile')
    @UseGuards(AuthGuard(), CustomerGuard)
    Profile(@Req() req) {
        return this.customerService.Profile(req.user)
    }


    @Post('login')
    Login(@Body() body, @Headers('x-forwarded-for') XForwardedFor, @Ip() ip) {
        return this.customerService.Login(body, XForwardedFor, ip)
    }
}
