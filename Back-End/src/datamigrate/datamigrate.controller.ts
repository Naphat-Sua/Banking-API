import {Body, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {DatamigrateService} from "./datamigrate.service";
import {FileInterceptor} from "@nestjs/platform-express";
import rootPath from "../rootPath";
import {diskStorage} from 'multer';
import editNameUpload from "../dto/editNameUpload";
import csvFileFilter from "./csvFileFilter";

@Controller('datamigrate')
export class DatamigrateController {
    constructor(
        private datamigrateService: DatamigrateService
    ) {
    }

    @Post('createadmin')
    createAdmin(@Body() body) {
        return this.datamigrateService.createAdmin(body)
    }

    @Post('inputdata')
    inputData(@Body() body) {
        return this.datamigrateService.inputData(body)
    }

    @Post('settlement')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: rootPath + '/uploads/csv',
            filename: editNameUpload,
        }),
        fileFilter: csvFileFilter,
    }))
    inputDataSettlement(@UploadedFile() file) {
        this.datamigrateService.inputDataSettlement(file)
        return 'OK'
    }
}
