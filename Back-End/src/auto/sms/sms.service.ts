import {Injectable, Logger} from '@nestjs/common';
import {DatabaseService} from "../../database/database.service";
import {ShareService} from "../../share/share.service";
import moment = require("moment-timezone");

@Injectable()
export class SmsService {
    constructor(
        private databaseService: DatabaseService,
        private shareService: ShareService
    ) {

    }

    async autoSms(body) {
        const cutStatus = body.data.filter(value => value.Status == 'Receive' && (value.FromPhone == '027777777' || value.FromPhone == 'KBank'))
        for (const x of cutStatus) {
            const checkPromptpay = await this.databaseService.accountbankRepository.findOne({
                where: {
                    promptpay: x.Phone,
                    isDelete: false,
                    use: true
                }
            })
            if (checkPromptpay) {
                const checkSms = await this.databaseService.autosmsRepository.findOne({
                    phone: x.Phone,
                    status: x.Status,
                    fromPhone: x.FromPhone,
                    time: moment(x.Time).toDate(),
                    content: x.Content
                })
                if (!checkSms) {
                    const ModelCreate = {
                        phone: x.Phone,
                        status: x.Status,
                        fromPhone: x.FromPhone,
                        time: moment(x.Time).toDate(),
                        content: x.Content
                    }
                    const Create = await this.databaseService.autosmsRepository.create(ModelCreate)
                    const Save = await this.databaseService.autosmsRepository.insert(Create)
                    const resultInsert = await this.databaseService.autosmsRepository.findOne(Save.raw.insertId)
                    const price = x.FromPhone === '027777777' ? await this.findPriceFromSmsScb(x.Content, x.Phone) : x.FromPhone.toUpperCase() === 'KBANK' ? await this.findPriceFromSmsKbank(x.Content, x.Phone) : null
                    if (price && price > 0 && !isNaN(price)) {
                        const checkOrder = await this.databaseService.depositRepository.find({
                            accountbankId: checkPromptpay.id,
                            qrcode: true,
                            price: price,
                            status: 'wait'
                        })
                        Logger.debug(checkOrder)
                        if (checkOrder.length === 1) {
                            await this.shareService.banktransferSerivce.deposit.updateDepositByAuto(checkOrder[0].id, Save.raw.insertId, resultInsert.content)
                        }
                    }
                }
            }
        }
    }

    findPriceFromSmsKbank(content, promptpay): number {
        const MessageStart = `ConvertPrice Bank Kbank Promptpay number ${promptpay} , Content ${content}`
        Logger.log(MessageStart)
        let price = 0
        if (content.indexOf('เงินเข้า') >= 0) {
            const step1 = content.split('เงินเข้า')
            Logger.log(step1)
            let final = step1[1]
            if (final.indexOf('คงเหลือ') >= 0) {
                final = final.split('คงเหลือ')
                final = final[0]
            }
            if (final.indexOf('บ') >= 0) {
                final = final.replace(/บ/g, '')
            }
            if (final.indexOf(',') >= 0) {
                price = final.replace(/,/g, '')
            } else {
                price = final
            }
        }
        if (content.indexOf('รับโอน') >= 0) {
            const step1 = content.split(' ')
            Logger.log(step1)
            let final = step1[6]
            if (final.indexOf('คงเหลือ') >= 0) {
                final = final.split('คงเหลือ')
                final = final[0]
            }
            if (final.indexOf('บ') >= 0) {
                final = final.replace(/บ/g, '')
            }
            if (final.indexOf(',') >= 0) {
                price = final.replace(/,/g, '')
            } else {
                price = final
            }
        }
        Logger.log('Price: ' + price)
        return Number(price)
    }

    findPriceFromSmsScb(content, promptpay): number {
        Logger.log(`ConvertPrice Bank SCB Promptpay number ${promptpay} , Content ${content}`)
        let price = 0
        if (promptpay.length == 13) {
            if (content.indexOf('เข้า') >= 0) {
                const step1 = content.split('THB')
                Logger.debug(step1)
                const step2 = step1[1].split(' ')
                Logger.debug(step2)
                let final = step2[0]
                if (final.indexOf(',') >= 0) {
                    price = final.replace(/,/g, '')
                } else {
                    price = final
                }
            }
        } else {
            if (content.indexOf('เข้า') >= 0) {
                const step1 = content.split(' ')
                Logger.debug(step1)
                let final = step1[1]
                if (final.indexOf(',') >= 0) {
                    price = final.replace(/,/g, '')
                } else {
                    price = final
                }
            }
        }
        Logger.log('Price: ' + price)
        return Number(price)
    }
}
