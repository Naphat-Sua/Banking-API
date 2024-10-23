import {Module} from '@nestjs/common';
import {AccountbankService} from './accountbank.service';

@Module({
    providers: [AccountbankService],
    exports: [AccountbankService]
})
export class AccountbankModule {
}
