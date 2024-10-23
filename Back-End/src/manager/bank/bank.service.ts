import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {ShareService} from "../../share/share.service";
import * as moment from "moment-timezone";
import {DatabaseService} from "../../database/database.service";
import {GetbankOutput} from "../../admin/bank/dto/getbank.output";
import {AddAccountbankInput} from "../../admin/bank/dto/add-accountbank.input";
import {AddAccountbankOutput} from "../../admin/bank/dto/add-accountbank.output";
import {UpdateAccountbankInput} from "../../admin/bank/dto/update-accountbank.input";
import {UpdateAccountbankOutput} from "../../admin/bank/dto/update-accountbank.output";

@Injectable()
export class BankService {
    constructor(
        private databaseService: DatabaseService,
        private shareService: ShareService,
    ) {
    }

    async findAccountBank(query, page: number = 1, rows: number = 20): Promise<GetbankOutput> {
        const skip = (page - 1) * rows
        const getData = await this.databaseService.accountbankRepository.createQueryBuilder('AccountBanks')
        await getData.leftJoinAndSelect('AccountBanks.banktype', 'Banktype', 'AccountBanks.banktype IS NOT NULL')
        await getData.where('AccountBanks.isDelete = :isDelete', {isDelete: false})

        if (query.account) {
            await getData.andWhere('AccountBanks.account LIKE :Account', {Account: `%${query.account}%`})
        }
        if (query.banktypeId && !isNaN(Number(query.banktypeId))) {
            await getData.andWhere('Banktype.id = :BankTypeId', {BankTypeId: Number(query.banktypeId)})
        }
        if (query.name) {
            await getData.andWhere('AccountBanks.name LIKE :NameAccount', {NameAccount: `%${query.name}%`})
        }

        await getData.limit(rows)
        await getData.offset(skip)

        return {
            count: await getData.getCount(),
            data: (await getData.getMany()).map(value => {
                return {
                    id: value.id,
                    account: value.account,
                    name: value.name,
                    promptpay: value.promptpay,
                    use: value.use,
                    type: {
                        id: value.banktypeId,
                        name: value.banktype ? value.banktype.key : ''
                    },
                    createdAt: moment(value.createdAt).toDate()
                }
            })
        }
    }

    async addAccountBank(body: AddAccountbankInput): Promise<AddAccountbankOutput> {
        const checkTypebank = await this.databaseService.typebankRepository.findOne(body.banktype_id)
        if (!checkTypebank) {
            throw new InternalServerErrorException({
                code: 500,
                message: 'Not have type bank id'
            })
        }
        const whareAccount = []
        whareAccount.push({
            account: body.account,
            banktypeId: body.banktype_id,
            isDelete: false
        })
        if (body.promptpay) {
            whareAccount.push(
                {
                    promptpay: body.promptpay,
                    isDelete: false
                }
            )
        }
        const checkAccount = await this.databaseService.accountbankRepository.find({
            where: whareAccount
        })
        if (checkAccount.length > 0) {
            throw new BadRequestException({
                code: 400,
                message: 'You have account or promtpay in system'
            })
        }
        const ModelCreate = {
            account: body.account,
            name: body.name,
            promptpay: body.promptpay,
            banktypeId: checkTypebank.id
        }
        const Create = await this.databaseService.accountbankRepository.create(ModelCreate)
        const Result = await this.databaseService.accountbankRepository.insert(Create)
        const resultInsert = await this.databaseService.accountbankRepository.findOne(Result.raw.insertId)
        return {
            id: Result.raw.insertId,
            account: resultInsert.account
        }
    }

    async updateAccountBank(body: UpdateAccountbankInput): Promise<UpdateAccountbankOutput> {
        const getData = await this.databaseService.accountbankRepository.findOne({
            where: {
                id: body.id,
                isDelete: false
            }
        })
        if (!getData) {
            throw new InternalServerErrorException({
                code: 500,
                message: 'Not have id'
            })
        }
        let banktype_id = null
        if (body.banktype_id) {
            const checkTypebank = await this.databaseService.typebankRepository.findOne(body.banktype_id)
            if (!checkTypebank) {
                throw new InternalServerErrorException({
                    code: 500,
                    message: 'Not have type bank id'
                })
            }
            banktype_id = checkTypebank.id
        }
        const updateData = {
            name: body.name ? body.name : getData.name,
            promptpay: body.promptpay ? body.promptpay : getData.promptpay,
            use: body.use === true || body.use === false ? body.use : getData.use,
            banktypeId: body.banktype_id ? banktype_id : getData.banktypeId
        }
        const Result = await this.databaseService.accountbankRepository.update(getData.id, updateData)
        return {
            id: getData.id,
            name: updateData.name,
            promptpay: updateData.promptpay,
            use: updateData.use,
        }
    }

    async deleteAccountBank(id) {
        const getData = await this.databaseService.accountbankRepository.findOne(id)
        if (!getData) {
            throw new InternalServerErrorException({
                code: 500,
                message: 'Not have id'
            })
        }
        getData.isDelete = true
        const Result = await this.databaseService.accountbankRepository.update(getData.id, {isDelete: true})
    }
}
