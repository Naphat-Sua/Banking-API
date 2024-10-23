import {Injectable, Logger} from '@nestjs/common';
import {FileUploadOutput} from "../dto/FileUpdate.output";
import {ShareService} from "../share/share.service";
import {DatabaseService} from "../database/database.service";
import rootPath from '../rootPath'
import fs = require("fs");

@Injectable()
export class IndexService {
    constructor(
        private databaseService: DatabaseService,
        private shareService: ShareService
    ) {
    }

    async uploadImageWithdraw(file): Promise<FileUploadOutput> {
        const copyFilePath = `${rootPath}/public/images/withdraw/${file.filename}`
        await fs.copyFileSync(file.path, copyFilePath)
        return {
            filename: `${file.filename}`,
            url: `${this.shareService.configService.get<string>('baseURL')}/images/withdraw/${file.filename}`
        };
    }

    async uploadImageSettlement(file): Promise<FileUploadOutput> {
        const copyFilePath = `${rootPath}/public/images/settlement/${file.filename}`
        await fs.copyFileSync(file.path, copyFilePath)
        return {
            filename: `${file.filename}`,
            url: `${this.shareService.configService.get<string>('baseURL')}/images/settlement/${file.filename}`
        };
    }

    async SelectTypeBankString() {
        const getData = await this.databaseService.typebankRepository.find()
        return getData.map(value => {
            return {
                value: value.key,
                label: value.nameEn
            }
        })
    }

    async SelectTypeBank() {
        const getData = await this.databaseService.typebankRepository.find()
        return getData.map(value => {
            return {
                value: value.id,
                label: value.nameEn
            }
        })
    }

    async TypeBank() {
        const getData = await this.databaseService.typebankRepository.find()
        return getData.map(value => {
            return {
                id: value.id,
                name: value.name,
                name_en: value.nameEn,
                key: value.key
            }
        })
    }
}
