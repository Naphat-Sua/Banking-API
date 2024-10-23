import {OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway} from "@nestjs/websockets";
import {ServiceAutoService} from "../service-auto/service-auto.service";
import {Socket} from "socket.io";
import {Logger} from "@nestjs/common";


@WebSocketGateway({namespace: 'auto', transports: ['websocket'], pingTimeout: 60000})
export class GatewaysAutoService implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private serviceAuto: ServiceAutoService
    ) {
    }

    handleDisconnect(client: Socket) {
        Logger.log(`Auto Client disconnected: ${client.id}`);
        Logger.debug(client.request.connection.remoteAddress)
    }

    handleConnection(client: Socket, ...args: any[]) {
        Logger.log(`Auto Client connected: ${client.id}`);
        Logger.debug(client.request.connection.remoteAddress)
    }

    @SubscribeMessage('banktransfer/deposit/cancel/timeout')
    banktransferDepositCancelTimeout(client: Socket, data: number) {
        Logger.log(`Start Auto cancel`)
        this.serviceAuto.autoBanktransferDepositCancelTimeout(data)
    }

    @SubscribeMessage('banktransfer/deposit/success/scbpinapp')
    banktransferDepositAutoByAppSCB(client: Socket, data: any) {
        Logger.log(`Start Auto SCB App`)
        this.serviceAuto.autoBanktransferDepositSuccessByAppSCB(data)
    }

    @SubscribeMessage('banktransfer/deposit/success/sms')
    banktransferDepositAutoBySMS(client: Socket, data: any) {
        Logger.log(`Start Auto SMS`)
    }
}
