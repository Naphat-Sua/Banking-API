import {OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway} from "@nestjs/websockets";
import {Socket} from "socket.io";
import {Logger} from "@nestjs/common";
import {ServicePaymentsService} from "../service-payments/service-payments.service";

@WebSocketGateway({namespace: 'paymentpage', transports: ['websocket'], pingTimeout: 60000})
export class GatewaysPaymentsService implements OnGatewayConnection, OnGatewayDisconnect {

    constructor(
        private servicePayment: ServicePaymentsService
    ) {
    }

    handleDisconnect(client: Socket) {
        Logger.log(`PaymentPage Client disconnected: ${client.id}`);
        Logger.debug(client.request.connection.remoteAddress)
    }

    handleConnection(client: Socket, ...args: any[]) {
        Logger.log(`PaymentPage Client connected: ${client.id}`);
        Logger.debug(client.request.connection.remoteAddress)
    }

    @SubscribeMessage('connection')
    handleConnect(client: Socket, data: string): void {
        this.servicePayment.joinRoom(client, data)
    }
}
