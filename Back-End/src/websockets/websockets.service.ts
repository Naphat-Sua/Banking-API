import {WebSocketGateway} from "@nestjs/websockets";
import {Server} from "socket.io";
import {ServiceWebbackofficeService} from "./service-webbackoffice/service-webbackoffice.service";
import {ServicePaymentsService} from "./service-payments/service-payments.service";

@WebSocketGateway()
export class WebsocketsService {
    public serverSocket: Server = null

    constructor(
        public serviceWebbackoffice: ServiceWebbackofficeService,
        public servicePaymentPage: ServicePaymentsService
    ) {
    }
}
