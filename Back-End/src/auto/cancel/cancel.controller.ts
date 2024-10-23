import {Controller, Get} from '@nestjs/common';
import {CancelService} from "./cancel.service";

@Controller('auto/cancel')
export class CancelController {
    constructor(
        private cancelService: CancelService
    ) {
    }

    @Get('')
    autoCancelOrder(){
        return this.cancelService.autoCancelOrder()
    }
}
