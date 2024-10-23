import {Module} from '@nestjs/common';
import {EmailService} from './email.service';
import {Formatmessage} from "./formatmessage";

@Module({
    providers: [EmailService, Formatmessage],
    exports: [EmailService]
})
export class EmailModule {
}
