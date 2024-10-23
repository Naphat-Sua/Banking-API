import {Body, Controller, Patch, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {ApiBearerAuth, ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ErrorOutput} from "../../dto/Error.output";
import {ManagerGuard} from "../../auth/Manager.guard";
import {SettingService} from "./setting.service";
import {ResetPasswordInput} from "../../admin/setting/dto/ResetPassword.input";
import {SettingProfileInput} from "../../admin/setting/dto/SettingProfile.input";

@UseGuards(AuthGuard(), ManagerGuard)
@ApiTags('Manager')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('manager/setting')
export class SettingController {
    constructor(
        private settingService: SettingService
    ) {
    }

    @Patch('resetpassword')
    ResetPassword(@Req() req, @Body() body: ResetPasswordInput) {
        return this.settingService.ResetPassword(req.user, body)
    }

    @Patch('profile')
    SettingProfile(@Req() req, @Body() body: SettingProfileInput) {
        return this.settingService.SettingProfile(req.user, body)
    }
}
