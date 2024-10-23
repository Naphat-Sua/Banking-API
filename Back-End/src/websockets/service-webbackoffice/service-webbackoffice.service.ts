import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {DatabaseService} from "../../database/database.service";
import {Socket} from "socket.io";
import * as JWT from 'jwt-decode';
import {WebsocketsService} from "../websockets.service";
import * as moment from "moment-timezone";

@Injectable()
export class ServiceWebbackofficeService {
    constructor(
        private databaseService: DatabaseService,
        @Inject(forwardRef(() => WebsocketsService))
        private webSocket: WebsocketsService
    ) {
    }

    async joinRoom(client: Socket, data: string) {
        const jwtDecode = {
            // @ts-ignore
            ...JWT(data)
        }
        if (jwtDecode.role === 'admin' || jwtDecode.role === 'manager' || jwtDecode.role === 'operation') {
            client.join('team')
        }
        if (jwtDecode.role === 'customer') {
            client.join(`customer_${jwtDecode.id}`)
        }
        if (jwtDecode.role === 'agent') {
            client.join(`agent_${jwtDecode.id}`)
        }
    }

    async emitSocketCreate(type, id) {
        if (type === 'deposit') {
            const getData = await this.databaseService.depositRepository.findOne(id, {
                relations: ['customer']
            })
            if (getData) {
                this.webSocket.serverSocket.of('/webbackoffice').to('team').emit('notify', {
                    type: 'info',
                    icon: 'fi flaticon-deposit-2',
                    message: `New Deposit OrderID ${getData.orderid} customer ${getData.customer ? getData.customer.name : '(No name)'}`
                })
            }
        }
        if (type === 'withdraw') {
            const getData = await this.databaseService.withdrawRepository.findOne(id, {
                relations: ['customer']
            })
            if (getData) {
                this.webSocket.serverSocket.of('/webbackoffice').to('team').emit('notify', {
                    type: 'info',
                    icon: 'fi flaticon-withdrawal',
                    message: `New Withdraw OrderID ${getData.orderid} customer ${getData.customer ? getData.customer.name : '(No name)'}`
                })
            }
        }
        if (type === 'settlement') {
            const getData = await this.databaseService.settlementRepository.findOne(id, {
                relations: ['customer']
            })
            if (getData) {
                this.webSocket.serverSocket.of('/webbackoffice').to('team').emit('notify', {
                    type: 'info',
                    icon: 'fi flaticon-salary',
                    message: `New Settlement ID ${getData.id} customer ${getData.customer ? getData.customer.name : '(No name)'}`
                })
            }
        }
    }

    async emitSocketsDepositUpdate(id) {
        const getData = await this.databaseService.depositRepository.findOne(id, {
            relations: ['customer', 'accountbank', 'accountbank.banktype']
        })
        if (getData) {
            const Model = {
                id: getData.id,
                token: getData.token,
                account: getData.accountbank ? getData.accountbank.account : null,
                bank: getData.accountbank && getData.accountbank.banktype ? getData.accountbank.banktype.key : null,
                customer: getData.customer ? getData.customer.name : null,
                orderid: getData.orderid,
                qrcode: getData.qrcode,
                price: getData.price,
                mdr: (getData.price * getData.mdr) / 100,
                from_account: getData.fromAccount ? getData.fromAccount : '',
                from_bank: getData.fromBank ? getData.fromBank : '',
                from_name: getData.fromName ? getData.fromName : '',
                status: getData.status,
                createdAt: moment(getData.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: moment(getData.updatedAt).format('YYYY-MM-DD HH:mm:ss')
            }
            this.webSocket.serverSocket.of('/webbackoffice').to('team').emit('update_deposit', Model)
            if (getData.customer) {
                this.webSocket.serverSocket.of('/webbackoffice').to(`customer_${getData.customer.id}`).emit('update_deposit', Model)
                if (getData.customer.agentId) {
                    this.webSocket.serverSocket.of('/webbackoffice').to(`agent_${getData.customer.agentId}`).emit('update_deposit', Model)
                }
            }
            this.webSocket.serverSocket.of('/webbackoffice').to('team').emit('notify', {
                type: getData.status === 'edit' ? 'warning' : getData.status === 'success' ? 'success' : getData.status === 'cancel' ? 'danger' : 'info',
                icon: 'fi flaticon-deposit-2',
                message: `Update Deposit OrderID ${getData.orderid} status ${getData.status}`
            })
            this.webSocket.serverSocket.of('/paymentpage').emit('update_deposit', Model)
        }
    }

    async emitSocketsWithdrawUpdate(id) {
        const getData = await this.databaseService.withdrawRepository.findOne(id, {
            relations: ['customer']
        })
        if (getData) {
            const Model = {
                id: getData.id,
                orderid: getData.orderid,
                account: getData.account,
                name: getData.name,
                to_banking: getData.toBanking,
                price: getData.price,
                mdr: getData.price * (getData.mdr / 100),
                customer: getData.customer ? {id: getData.customer.id, name: getData.customer.name} : null,
                status: getData.status,
                image: getData.image,
                createdAt: moment(getData.createdAt).toDate(),
                updatedAt: moment(getData.updatedAt).toDate()
            }
            this.webSocket.serverSocket.of('/webbackoffice').to('team').emit('update_withdraw', Model)
            if (getData.customer) {
                this.webSocket.serverSocket.of('/webbackoffice').to(`customer_${getData.customer.id}`).emit('update_withdraw', Model)
                if (getData.customer.agentId) {
                    this.webSocket.serverSocket.of('/webbackoffice').to(`agent_${getData.customer.agentId}`).emit('update_withdraw', Model)
                }
            }
            this.webSocket.serverSocket.of('/webbackoffice').to('team').emit('notify', {
                type: getData.status === 'edit' ? 'warning' : getData.status === 'success' ? 'success' : getData.status === 'cancel' ? 'danger' : 'info',
                icon: 'fi flaticon-deposit-2',
                message: `Update Withdraw OrderID ${getData.orderid} status ${getData.status}`
            })
        }
    }

    async emitSocketsSettlementUpdate(id) {
        const getData = await this.databaseService.settlementRepository.findOne(id, {
            relations: ['customer']
        })
        if (getData) {
            const Model = {
                id: getData.id,
                orderid: getData.orderid,
                price: getData.price,
                to_banking: getData.banktype ? getData.banktype.key : '',
                name: getData.bankname,
                account: getData.bankaccount,
                customer: getData.customer ? {id: getData.customer.id, name: getData.customer.name} : null,
                status: getData.status,
                image: getData.image,
                mdr: getData.price * (getData.mdr / 100),
                fee: getData.fee,
                createdAt: moment(getData.createdAt).toDate(),
                updatedAt: moment(getData.updatedAt).toDate()
            }
            this.webSocket.serverSocket.of('/webbackoffice').to('team').emit('update_settlement', Model)
            if (getData.customer) {
                this.webSocket.serverSocket.of('/webbackoffice').to(`customer_${getData.customer.id}`).emit('update_settlement', Model)
                if (getData.customer.agentId) {
                    this.webSocket.serverSocket.of('/webbackoffice').to(`agent_${getData.customer.agentId}`).emit('update_settlement', Model)
                }
            }
            this.webSocket.serverSocket.of('/webbackoffice').to('team').emit('notify', {
                type: getData.status === 'edit' ? 'warning' : getData.status === 'success' ? 'success' : getData.status === 'cancel' ? 'danger' : 'info',
                icon: 'fi flaticon-deposit-2',
                message: `Update Settlement ID ${getData.id} status ${getData.status}`
            })
        }
    }
}
