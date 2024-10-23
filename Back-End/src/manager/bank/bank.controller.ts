import {Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {ApiBearerAuth, ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ErrorOutput} from "../../dto/Error.output";
import {ManagerGuard} from "../../auth/Manager.guard";
import {BankService} from "./bank.service";
import {AddAccountbankInput} from "../../admin/bank/dto/add-accountbank.input";
import {UpdateAccountbankInput} from "../../admin/bank/dto/update-accountbank.input";

@UseGuards(AuthGuard(), ManagerGuard)
@ApiTags('Manager')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('manager/bank/account')
export class BankController {
    constructor(
        private bankService: BankService
    ) {
    }

    @Get('')
    findAccountBank(@Query() query, @Query('page') page: number, @Query('rows') rows: number) {
        return this.bankService.findAccountBank(query, page, rows)
    }

    @Post('add')
    addAccountBank(@Body() body: AddAccountbankInput) {
        return this.bankService.addAccountBank(body)
    }

    @Patch('update')
    updateAccountBank(@Body() body: UpdateAccountbankInput) {
        return this.bankService.updateAccountBank(body)
    }

    @Delete('delete/:id')
    deleteAccountBank(@Param('id') id: number) {
        this.bankService.deleteAccountBank(id)
    }
}
