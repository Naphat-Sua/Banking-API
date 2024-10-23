import {Module} from '@nestjs/common';
import {McpaymentService} from './mcpayment.service';
import {ExportService} from './export/export.service';

@Module({
    providers: [McpaymentService, ExportService],
    exports: [McpaymentService, ExportService]
})
export class McpaymentModule {
}
