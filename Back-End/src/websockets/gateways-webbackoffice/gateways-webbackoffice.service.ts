import {OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway} from "@nestjs/websockets";
import {Socket} from "socket.io";
import {Logger} from "@nestjs/common";
import {ServiceWebbackofficeService} from "../service-webbackoffice/service-webbackoffice.service";

@WebSocketGateway({namespace: 'webbackoffice', transports: ['websocket'], pingTimeout: 60000})
export class GatewaysWebbackofficeService implements OnGatewayConnection, OnGatewayDisconnect {

    constructor(
        private serviceWebbackoffice: ServiceWebbackofficeService
    ) {
    }

    handleDisconnect(client: Socket) {
        Logger.log(`WebBackoffice Client disconnected: ${client.id}`);
        Logger.debug(client.request.connection.remoteAddress)
    }

    handleConnection(client: Socket, ...args: any[]) {
        Logger.log(`WebBackoffice Client connected: ${client.id}`);
        Logger.debug(client.request.connection.remoteAddress)
    }

    @SubscribeMessage('connection')
    handleConnect(client: Socket, data: string): void {
        this.serviceWebbackoffice.joinRoom(client, data)
    }


}
