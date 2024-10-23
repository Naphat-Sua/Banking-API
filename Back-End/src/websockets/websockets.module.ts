import {Module} from '@nestjs/common';
import {MainGatewaysService} from './main-gateways/main-gateways.service';
import {WebsocketsService} from './websockets.service';
import {GatewaysWebbackofficeService} from './gateways-webbackoffice/gateways-webbackoffice.service';
import {ServiceWebbackofficeService} from './service-webbackoffice/service-webbackoffice.service';
import {ServicePaymentsService} from './service-payments/service-payments.service';
import {GatewaysPaymentsService} from './gateways-payments/gateways-payments.service';
import { GatewaysAutoService } from './gateways-auto/gateways-auto.service';
import { ServiceAutoService } from './service-auto/service-auto.service';

@Module({
    providers: [
        MainGatewaysService, WebsocketsService, GatewaysWebbackofficeService, ServiceWebbackofficeService, ServicePaymentsService, GatewaysPaymentsService, GatewaysAutoService, ServiceAutoService],
    exports: [WebsocketsService]
})
export class WebsocketsModule {
}
