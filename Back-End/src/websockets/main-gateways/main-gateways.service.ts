import {Logger} from '@nestjs/common';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {WebsocketsService} from "../websockets.service";

@WebSocketGateway({transports: ['websocket'], pingTimeout: 60000})
export class MainGatewaysService implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    constructor(
        public webSockets: WebsocketsService
    ) {
    }

    afterInit(server: Server) {
        Logger.debug('Start Socket')
        this.webSockets.serverSocket = server
    }

    handleDisconnect(client: Socket) {
        Logger.log(`Client disconnected: ${client.id}`);
        Logger.debug(client.request.connection.remoteAddress)
    }

    handleConnection(client: Socket, ...args: any[]) {
        Logger.log(`Client connected: ${client.id}`);
        Logger.debug(client.request.connection.remoteAddress)
    }
}
