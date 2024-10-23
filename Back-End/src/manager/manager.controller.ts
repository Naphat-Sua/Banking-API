import {Body, Controller, Get, Headers, Ip, Post, Req, UseGuards} from '@nestjs/common';
import {ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ErrorOutput} from "../dto/Error.output";
import {ManagerService} from "./manager.service";
import {AuthGuard} from "@nestjs/passport";
import {ManagerGuard} from "../auth/Manager.guard";
import {AdminGuard} from "../auth/Admin.guard";

@ApiTags('Manager')
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('manager')
export class ManagerController {
    constructor(
        private managerService: ManagerService
    ) {
    }

    @Get('checkauth')
    @UseGuards(AuthGuard(), ManagerGuard)
    checkAuth(@Req() req) {
        return this.managerService.checkAuth(req.user)
    }

    @Get('profile')
    @UseGuards(AuthGuard(), ManagerGuard)
    Profile(@Req() req) {
        return this.managerService.Profile(req.user)
    }


    @Post('login')
    Login(@Body() body, @Headers('x-forwarded-for') XForwardedFor, @Ip() ip) {
        return this.managerService.Login(body, XForwardedFor, ip)
    }
}
