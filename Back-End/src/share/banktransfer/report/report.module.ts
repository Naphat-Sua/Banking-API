import {Module} from '@nestjs/common';
import {ReportService} from './report.service';
import {EmailModule} from "../../../sendprovider/email/email.module";

@Module({
    imports: [EmailModule],
    providers: [ReportService],
    exports: [ReportService]
})
export class ReportModule {
}
