import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {ShareService} from "../../share/share.service";
import {FindOperationOutput} from "../../admin/operation/dto/FindOperation.output";
import * as moment from "moment-timezone";
import * as randtoken from "rand-token";
import * as crypto from "crypto";
import {DatabaseService} from "../../database/database.service";
import {AddOperationInput} from "../../admin/operation/dto/add-operation.input";
import {AddOperationOutput} from "../../admin/operation/dto/add-operation.output";
import {UpdateOperationInput} from "../../admin/operation/dto/update-operation.input";
import {UpdateOperationOutput} from "../../admin/operation/dto/update-operation.output";

@Injectable()
export class OperationService {
    constructor(
        private databaseService: DatabaseService,
        private shareService: ShareService
    ) {
    }

    async findOperation(query, page: number = 1, rows: number = 20): Promise<FindOperationOutput> {
        const skip = (page - 1) * rows
        const getData = await this.databaseService.operationRepository.createQueryBuilder('Operation')
        await getData.where('Operation.isDelete = :isDelete', {isDelete: false})
        if (query.username) {
            await getData.andWhere('Operation.username LIKE :username', {username: `%${query.username}%`})
        }
        if (query.name) {
            await getData.andWhere('Operation.name LIKE :name', {name: `%${query.name}%`})
        }
        if (query.phone) {
            await getData.andWhere('Operation.phone LIKE :phone', {phone: `%${query.phone}%`})
        }
        if (query.email) {
            await getData.andWhere('Operation.email LIKE :email', {name: `%${query.email}%`})
        }
        await getData.limit(rows)
        await getData.offset(skip)
        return {
            count: await getData.getCount(),
            data: (await getData.getMany()).map(value => {
                return {
                    id: value.id,
                    username: value.username,
                    name: value.name,
                    phone: value.phone,
                    email: value.email,
                    ban: value.ban,
                    createdAt: moment(value.createdAt).toDate(),
                    updatedAt: moment(value.updatedAt).toDate()
                }
            })
        }
    }

    async addOperation(body: AddOperationInput): Promise<AddOperationOutput> {
        const whareSQL = []
        whareSQL.push({
            username: body.username,
            isDelete: false
        })
        whareSQL.push({
            email: body.email,
            isDelete: false
        })
        if (body.phone) {
            whareSQL.push({
                phone: body.phone,
                isDelete: false
            })
        }
        const checkOperation = await this.databaseService.operationRepository.find({
            where: whareSQL
        })

        const countUsername = await checkOperation.filter(value => value.username === body.username)
        const countEmail = await checkOperation.filter(value => value.email === body.email)
        const countPhone = body.phone ? await checkOperation.filter(value => value.phone === body.phone) : []

        if (countUsername.length > 0) {
            throw new BadRequestException({
                code: 400,
                message: 'Can not use username'
            })
        }
        if (countEmail.length > 0) {
            throw new BadRequestException({
                code: 400,
                message: 'Can not use email'
            })
        }

        if (countPhone.length > 0) {
            throw new BadRequestException({
                code: 400,
                message: 'Can not use phone'
            })
        }
        const ModelCreate = {
            username: body.username,
            password: crypto.createHash('MD5').update(body.password).digest('hex'),
            name: body.name,
            email: body.email,
            phone: body.phone,
            token: randtoken.generate(256)
        }
        const Create = await this.databaseService.operationRepository.create(ModelCreate)
        const Result = await this.databaseService.operationRepository.insert(Create)
        const resultInsert = await this.databaseService.operationRepository.findOne(Result.raw.insertId)
        await this.shareService.emailService.createOperation(resultInsert.email, resultInsert.name, resultInsert.username, body.password)
        return {
            id: Result.raw.insertId
        }
    }

    async updateOperation(body: UpdateOperationInput): Promise<UpdateOperationOutput> {
        const getData = await this.databaseService.operationRepository.findOne({
            where: {
                id: body.id,
                isDelete: false
            }
        })
        if (!getData) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have id'
            })
        }
        if (body.email && body.email !== getData.email) {
            const checkEmail = await this.databaseService.operationRepository.find({
                where: {
                    email: body.email,
                    isDelete: false
                }
            })
            if (checkEmail.length > 0) {
                throw new BadRequestException({
                    code: 400,
                    message: 'Can not use email'
                })
            }
        }
        if (body.phone) {
            const checkPhone = await this.databaseService.operationRepository.find({
                where: {
                    phone: body.phone,
                    isDelete: false
                }
            })
            if (checkPhone.length > 0) {
                throw new BadRequestException({
                    code: 400,
                    message: 'Can not use phone'
                })
            }
        }

        const updateData = {
            name: body.name ? body.name : getData.name,
            phone: body.phone ? body.phone : getData.phone,
            email: body.email ? body.email : getData.email,
            ban: body.ban === true || body.ban === false ? body.ban : getData.ban
        }
        const Result = await this.databaseService.operationRepository.update(getData.id, updateData)
        return {
            id: getData.id,
            success: true
        }
    }

    async deleteOperation(id: number) {
        const getData = await this.databaseService.operationRepository.findOne(id)
        if (!getData) {
            throw new InternalServerErrorException({
                code: 500,
                message: 'Not have id'
            })
        }
        const Result = await this.databaseService.operationRepository.update(getData.id, {isDelete: true})
    }
}
