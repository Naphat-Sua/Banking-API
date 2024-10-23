import {Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import rootPath from "../rootPath";
import editNameUpload from "../dto/editNameUpload";
import imageFileFilter from "../dto/imageFileFilter";
import {ApiBody, ApiConsumes, ApiCreatedResponse} from "@nestjs/swagger";
import {FileUploadInput} from "../dto/FileUpload.input";
import {FileUploadOutput} from "../dto/FileUpdate.output";
import {IndexService} from "./index.service";
import {diskStorage} from 'multer';
import {AuthGuard} from "@nestjs/passport";
import {IpGuard} from "../auth/ip.guard";

@Controller('')
export class IndexController {

    constructor(
        private indexService: IndexService
    ) {
    }

    @Post('upload/withdraw')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: rootPath + '/uploads/images/withdraw',
            filename: editNameUpload,
        }),
        fileFilter: imageFileFilter,
    }))
    @ApiBody({
        type: FileUploadInput
    })
    @ApiCreatedResponse({
        type: FileUploadOutput
    })
    @UseGuards(AuthGuard(), IpGuard)
    @ApiConsumes('multipart/form-data')
    uploadFileWithdraw(@UploadedFile() file): Promise<FileUploadOutput> {
        return this.indexService.uploadImageWithdraw(file);
    }

    @Post('upload/settlement')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: rootPath + '/uploads/images/settlement',
            filename: editNameUpload,
        }),
        fileFilter: imageFileFilter,
    }))
    @ApiBody({
        type: FileUploadInput
    })
    @ApiCreatedResponse({
        type: FileUploadOutput
    })
    @UseGuards(AuthGuard(), IpGuard)
    @ApiConsumes('multipart/form-data')
    uploadFileSettlement(@UploadedFile() file): Promise<FileUploadOutput> {
        return this.indexService.uploadImageSettlement(file);
    }

    @Get('select/typebank/value')
    SelectTypeBank() {
        return this.indexService.SelectTypeBank()
    }

    @Get('select/typebank/string')
    SelectTypeBankString() {
        return this.indexService.SelectTypeBankString()
    }

    @Get('typebank')
    TypeBank() {
        return this.indexService.TypeBank()
    }
}
