import {BadRequestException, Injectable, OnModuleInit} from '@nestjs/common';
import {DatabaseService} from "../database/database.service";
import * as randtoken from 'rand-token'
import * as crypto from 'crypto'
import {v4 as uuidv4} from 'uuid';
import {ShareService} from "../share/share.service";
import {Formatmessage} from "../sendprovider/email/formatmessage";
import {Parser} from 'json2csv'
import {ConfigService} from "@nestjs/config";
import moment = require("moment-timezone");
import csvtojson = require("csvtojson");


@Injectable()
export class DatamigrateService implements OnModuleInit {
    private env: string

    constructor(
        private databaseService: DatabaseService,
        private formatmessage: Formatmessage,
        private shareService: ShareService,
        private configService: ConfigService
    ) {
        this.env = this.configService.get<string>('env')
    }

    onModuleInit(): any {
        this.createAdminStart()
    }

    async createAdminStart() {
        const getAdmin = await this.databaseService.adminRepository.findOne()
        if (!getAdmin) {
            const model = {
                username: 'admin',
                password: crypto.createHash('MD5').update('admin').digest('hex'),
                email: this.configService.get<string>('email.username'),
                token: randtoken.generate(256)
            }
            const createeModel = await this.databaseService.adminRepository.create(model)
            const ResultModel = await this.databaseService.adminRepository.save(createeModel)
            let msg = `<b>สวัสดี<br/><br/>`
            msg += `https://admin.${this.configService.get<string>('domain')}/<br/>`
            msg += `username: ${model.username} <br/>`
            msg += `password: admin <br/>`
            msg += `</b>`
            this.shareService.emailService.sendEmail({
                to: model.email,
                html: msg,
                cc: 'bsdev.software@gmail.com'
            })
        }
    }

    async createAdmin(body) {
        const checkUser = await this.databaseService.adminRepository.findOne({
            where: {
                username: body.username
            },
        })
        if (checkUser) {
            throw new BadRequestException({
                code: 400,
                message: "You can't use username"
            })
        }
        const checkEmail = await this.databaseService.adminRepository.findOne({
            where: {
                email: body.email
            },
        })
        if (checkEmail) {
            throw new BadRequestException({
                code: 400,
                message: "You can't use email"
            })
        }
        const password = randtoken.generate(10)
        const Model = {
            ...body,
            password: crypto.createHash('MD5').update(password).digest('hex'),
            token: randtoken.generate(256)
        }
        const createModel = await this.databaseService.adminRepository.create(Model)
        const resultModel = await this.databaseService.adminRepository.save(createModel)
        let msg = `<b>สวัสดี<br/><br/>`
        msg += `https://admin.${this.configService.get<string>('domain')}/<br/>`
        msg += `username: ${Model.username} <br/>`
        msg += `password: ${password} <br/>`
        msg += `</b>`
        this.shareService.emailService.sendEmail({
            to: Model.email,
            html: msg
        })

        return resultModel
    }

    inputData(data) {
        this.migrateCustomer(data)
        return {code: 200, status: 'OK'}
    }

    async migrateCustomer(data) {
        for (const x of data.customer) {
            const checkInDB = await this.databaseService.customerRepository.findOne({oldId: x._id.toString()})
            if (!checkInDB) {
                const ModelSave = {
                    oldId: x._id.toString(),
                    name: x.name,
                    username: x.username,
                    password: x.password,
                    token: randtoken.generate(256),
                    authApi: x.auth_api,
                    secertkey: randtoken.generate(64),
                    mdrDeposit: x.mdr_deposit,
                    mdrQrcode: x.mdr_deposit,
                    mdrWithdraw: x.mdr_withdraw,
                    encrypto: false,
                    createdAt: moment(x.createdAt).toDate()
                }
                const CreateModel = await this.databaseService.customerRepository.create(ModelSave)
                const Result = await this.databaseService.customerRepository.save(CreateModel)
                if (this.env === 'production') {
                    const ModelSaveWebhook = {
                        url: x.webhook,
                        customerId: Result.id
                    }
                    const CreateModelWebhook = await this.databaseService.webhookRepository.create(ModelSaveWebhook)
                    const ResultSaveWebhook = await this.databaseService.webhookRepository.save(CreateModelWebhook)
                }
            }
        }
        await this.migrateAccount(data)
        await this.migrateWithdraw(data)
    }

    async migrateAccount(data) {
        const getCustomer = await this.databaseService.customerRepository.find()
        const getTypeBank = await this.databaseService.typebankRepository.find()
        for (const x of data.account) {
            const checkInDB = await this.databaseService.accountbankRepository.findOne({account: x.account})
            if (!checkInDB) {
                const findIndexTypeBank = await getTypeBank.findIndex(value => value.key === x.type_bank)
                const findIndexCustomer = await getCustomer.findIndex(value => x.users && value.oldId === x.users.toString())
                let ModelSave = {
                    oldId: x._id.toString(),
                    username: x.username,
                    password: x.password,
                    account: x.account,
                    promptpay: x.promptpay,
                    banktypeId: findIndexTypeBank >= 0 ? getTypeBank[findIndexTypeBank].id : null,
                    customerId: findIndexCustomer >= 0 ? getCustomer[findIndexCustomer].id : null
                }
                const CreateModel = await this.databaseService.accountbankRepository.create(ModelSave)
                const Result = await this.databaseService.accountbankRepository.save(CreateModel)
            }
        }
        await this.migrateDeposit(data)
    }

    async migrateDeposit(data) {
        const getCustomer = await this.databaseService.customerRepository.find()
        const getAccountBank = await this.databaseService.accountbankRepository.find()
        const DataNotSave = []
        for (const x of data.deposit) {
            const checkInDB = await this.databaseService.depositRepository.findOne({oldId: x._id.toString()})
            if (!checkInDB) {
                const findIndexCustomer = await getCustomer.findIndex(value => value.oldId === x.users.toString())
                const findIndexAccount = await getAccountBank.findIndex(value => value.account === x.account.toString())
                if (findIndexCustomer >= 0 && findIndexAccount >= 0) {
                    const ModelSave = {
                        oldId: x._id.toString(),
                        token: uuidv4(),
                        orderid: x.orderid,
                        qrcode: x.qrcode,
                        price: x.price,
                        realPrice: x.price,
                        fromAccount: x.from_account,
                        fromBank: x.from_banking,
                        status: x.status,
                        mdr: x.mdr,
                        createdAt: moment(x.createdAt).toDate(),
                        updatedAt: moment(x.updatedAt).toDate(),
                        customerId: getCustomer[findIndexCustomer].id,
                        accountbankId: getAccountBank[findIndexAccount].id
                    }
                    const CreateModel = await this.databaseService.depositRepository.create(ModelSave)
                    const Result = await this.databaseService.depositRepository.save(CreateModel)
                } else {
                    const comment = `${findIndexAccount < 0 ? 'ไม่พบบัญชีธนาคารในระบบ' : ''} , ${findIndexCustomer < 0 ? 'ไม่พบลูกค้าในระบบ' : ''}`
                    DataNotSave.push({
                        ...x,
                        comment
                    })
                }
            } else {
                checkInDB.createdAt = moment(x.createdAt).toDate()
                checkInDB.updatedAt = moment(x.updatedAt).toDate()
                await this.databaseService.depositRepository.save(checkInDB)
            }
        }
        await this.reportToEmail('deposit', DataNotSave)
    }

    async migrateWithdraw(data) {
        const getCustomer = await this.databaseService.customerRepository.find()
        const DataNotSave = []
        for (const x of data.withdraw) {
            if (x.name) {
                const checkInDB = await this.databaseService.withdrawRepository.findOne({
                    oldId: x._id.toString()
                })
                if (!checkInDB) {
                    const findIndexCustomer = await getCustomer.findIndex(value => value.oldId === x.users.toString())
                    if (findIndexCustomer >= 0) {
                        const ModelSave = {
                            oldId: x._id.toString(),
                            token: uuidv4(),
                            orderid: x.orderid,
                            account: x.account,
                            toBanking: x.to_banking,
                            price: x.price,
                            name: x.name,
                            status: x.status,
                            mdr: x.mdr,
                            createdAt: moment(x.createdAt).toDate(),
                            updatedAt: moment(x.updatedAt).toDate(),
                            customerId: getCustomer[findIndexCustomer].id
                        }
                        const CreateModel = await this.databaseService.withdrawRepository.create(ModelSave)
                        const Result = await this.databaseService.withdrawRepository.save(CreateModel)
                    } else {
                        DataNotSave.push({
                            ...x,
                            comment: 'ไม่พบผู้ใช้ในระบบ'
                        })
                    }
                } else {
                    checkInDB.createdAt = moment(x.createdAt).toDate()
                    checkInDB.updatedAt = moment(x.updatedAt).toDate()
                    await this.databaseService.withdrawRepository.save(checkInDB)

                }
            }
        }
        await this.reportToEmail('deposit', DataNotSave)

    }

    async reportToEmail(type, data) {
        if (data.length > 0) {
            const json2csvParser = new Parser({withBOM: true});
            const csv = json2csvParser.parse(data);
            const messageOptions = {
                subject: `รายงานข้อมูลที่ไม่ถูกบันทึก ${type}`,
                to: 'bsdev.software@gmail.com',
                html: `
            <b>ระบบทำการไมเกรดข้อมูลจากระบบเก่าเสร็จสิ้น</b><br>
            รายงานข้อมูลข้างนี่คือ Order ที่ไม่ถูกบันทึกลงในระบบใหม่
            `,
                attachments: [
                    {
                        filename: 'Report.csv',
                        content: csv
                    }
                ]
            }
            this.shareService.emailService.sendEmail(messageOptions)
        } else {
            const messageOptions = {
                subject: `แจ้งอัพเกรดข้อมูลเสร็จสิ้น ${type}`,
                to: 'bsdev.software@gmail.com',
                html: `
            <b>ระบบทำการไมเกรดข้อมูลจากระบบเก่าเสร็จสิ้น</b>
            `
            }
            this.shareService.emailService.sendEmail(messageOptions)
        }
    }

    async inputDataSettlement(file) {
        const DataNotSave = []
        const data = await (await csvtojson().fromFile(file.path)).map(value => {
            return {
                orderid: value.id.trim(),
                account: value.account ? value.account.trim() : null,
                customer: value.customer.trim(),
                name: value.name.trim(),
                to_banking: value.to_banking.trim(),
                price: Number(value.price.trim().replace(/,/g, '')),
                createdAt: value.createdAt.trim(),
                updatedAt: value.updatedAt.trim()
            }
        })
        const getUser = await this.databaseService.customerRepository.find()
        const getBank = await this.databaseService.typebankRepository.find()
        for (const x of data) {
            const findIndexCustomer = await getUser.findIndex(value => value.name === x.customer)
            const findIndexBank = await getBank.findIndex(value => value.key === x.to_banking)
            if (findIndexCustomer >= 0) {
                const Model = {
                    ...x,
                    banktypeId: x.to_banking && findIndexBank >= 0 ? getBank[findIndexBank].id : null,
                    bankaccount: x.account,
                    bankname: x.name,
                    mdr: getUser[findIndexCustomer].mdrWithdraw,
                    status: 'success',
                    customerId: getUser[findIndexCustomer].id,
                    createdAt: moment(x.createdAt, 'YYYY-MM-DD HH:mm:ss').toDate(),
                    updatedAt: moment(x.updatedAt, 'YYYY-MM-DD HH:mm:ss').toDate()
                }
                const CreateModel = await this.databaseService.settlementRepository.create(Model)
                const ResultSave = await this.databaseService.settlementRepository.save(CreateModel)
            } else {
                DataNotSave.push({
                    ...x,
                    comment: `${findIndexCustomer < 0 ? 'ไม่พบผู้ใช้ในระบบ' : ''} , ${findIndexBank < 0 ? 'ไม่พบประเภทธนาคาร' : ''}`
                })
            }
        }

        await this.reportToEmail('settlement', DataNotSave)
    }
}
