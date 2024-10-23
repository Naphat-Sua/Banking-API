import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {DatabaseService} from "../../database/database.service";
import {WebsocketsService} from "../websockets.service";

@Injectable()
export class ServicePaymentsService {
    constructor(
        private databaseService: DatabaseService,
        @Inject(forwardRef(() => WebsocketsService))
        private webSocket: WebsocketsService
    ) {
    }

    joinRoom(client, data) {
        if (data === 'demo') {
            client.join('demo')
        }
        if (data === 'real') {
            client.join('real')
        }
    }

    async banktransferReal(id) {
        const getData = await this.databaseService.depositRepository.findOne(id)
        if (getData) {
            const ModelUpdate = {
                id: getData.id,
                token: getData.token,
                status: getData.status,
            }
            this.webSocket.serverSocket.of('/payment').emit('update_bt_real', ModelUpdate)
        }
    }

}
