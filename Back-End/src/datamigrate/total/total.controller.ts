import {Controller, Get} from '@nestjs/common';
import {TotalService} from "./total.service";

@Controller('datamigrate/total')
export class TotalController {
    constructor(
        private totalService: TotalService
    ) {
    }

    @Get('allsum')
    allSumTotal() {
        return this.totalService.allSumTotal()
    }
}
