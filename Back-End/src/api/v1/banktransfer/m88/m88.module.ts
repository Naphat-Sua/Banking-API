import {forwardRef, Module} from '@nestjs/common';
import {M88Controller} from './m88.controller';
import {M88Service} from './m88.service';
import {BanktransferModule} from "../banktransfer.module";

@Module({
    imports: [
        forwardRef(() => BanktransferModule)
    ],
    controllers: [M88Controller],
    providers: [
        M88Service
    ]
})
export class M88Module {
}
