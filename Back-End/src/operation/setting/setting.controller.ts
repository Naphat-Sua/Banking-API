import {Body, Controller, Patch, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {OperationGuard} from "../../auth/Operation.guard";
import {ApiBearerAuth, ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ErrorOutput} from "../../dto/Error.output";
import {SettingService} from "./setting.service";

@UseGuards(AuthGuard(), OperationGuard)
@ApiTags('Operation')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('operation/setting')
export class SettingController {
    constructor(
        private settingService: SettingService
    ) {
    }

    @Patch('resetpassword')
    ResetPassword(@Req() req, @Body() body) {
        return this.settingService.ResetPassword(req.user, body)
    }

    @Patch('profile')
    SettingProfile(@Req() req, @Body() body) {
        return this.settingService.SettingProfile(req.user, body)
    }
}
