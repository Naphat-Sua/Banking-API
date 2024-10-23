import {Module, OnModuleInit} from '@nestjs/common';
import {IndexController} from './index.controller';
import {IndexService} from './index.service';
import rootPath from '../rootPath'
import fs = require("fs");

@Module({
    controllers: [IndexController],
    providers: [IndexService]
})
export class IndexModule implements OnModuleInit {

    onModuleInit(): any {
        const withdrawImages = rootPath + '/public/images/withdraw'
        const settlementImages = rootPath + '/public/images/settlement'
        if (!fs.existsSync(withdrawImages)) {
            fs.mkdirSync(withdrawImages, {recursive: true});
        }
        if (!fs.existsSync(settlementImages)) {
            fs.mkdirSync(settlementImages, {recursive: true});
        }
    }

}
