import {Body, Controller, Post} from '@nestjs/common';
import {SmsService} from "./sms.service";

@Controller('auto/sms')
export class SmsController {
    constructor(
        private smsService: SmsService
    ) {
    }

    @Post('')
    autoSms(@Body() body) {
        this.smsService.autoSms(body)
        return 'OK'
    }
}
