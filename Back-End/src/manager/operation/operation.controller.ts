import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    UseGuards
} from '@nestjs/common';
import {OperationService} from "./operation.service";
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {FindOperationOutput} from "../../admin/operation/dto/FindOperation.output";
import {AuthGuard} from "@nestjs/passport";
import {ManagerGuard} from "../../auth/Manager.guard";
import {ErrorOutput} from "../../dto/Error.output";
import {UpdateOperationInput} from "../../admin/operation/dto/update-operation.input";
import {UpdateOperationOutput} from "../../admin/operation/dto/update-operation.output";
import {AddOperationInput} from "../../admin/operation/dto/add-operation.input";
import {AddOperationOutput} from "../../admin/operation/dto/add-operation.output";

@UseGuards(AuthGuard(), ManagerGuard)
@ApiTags('Manager')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    type: ErrorOutput
})
@ApiInternalServerErrorResponse({
    type: ErrorOutput
})
@Controller('manager/operation')
export class OperationController {
    constructor(
        private operationService: OperationService
    ) {
    }

    @ApiOkResponse({
        type: FindOperationOutput
    })
    @Get('')
    findOperation(@Query() query, @Query('page') page: number, @Query('rows') rows: number): Promise<FindOperationOutput> {
        return this.operationService.findOperation(query, page, rows)
    }

    @ApiCreatedResponse({
        type: AddOperationOutput
    })
    @Post('add')
    addOperation(@Body() body: AddOperationInput): Promise<AddOperationOutput> {
        return this.operationService.addOperation(body)
    }

    @ApiCreatedResponse({
        type: UpdateOperationOutput
    })
    @Patch('update')
    updateOperation(@Body() body: UpdateOperationInput): Promise<UpdateOperationOutput> {
        return this.operationService.updateOperation(body)
    }

    @Delete('delete/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteOperation(@Param('id') id: number) {
        return this.operationService.deleteOperation(id)
    }
}
