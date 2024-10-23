import {Module} from '@nestjs/common';
import {BanktransferModule} from './banktransfer/banktransfer.module';
import { ThreePartyModule } from './three-party/three-party.module';

@Module({
    imports: [BanktransferModule, ThreePartyModule]
})
export class V1Module {
}
