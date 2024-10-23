import {BadRequestException, Injectable} from '@nestjs/common';
import {DatabaseService} from "../../database/database.service";
import * as crypto from 'crypto'
import {EditProfileInput} from "./dto/edit-profile.input";
import {EditProfileOutput} from "./dto/edit-profile.output";
import {ResetPasswordInput} from "./dto/reset-password.input";
import {ResetPasswordOutput} from "./dto/reset-password.output";

@Injectable()
export class SettingService {
    constructor(
        private databaseService: DatabaseService
    ) {
    }

    async editProfile(payload, body: EditProfileInput): Promise<EditProfileOutput> {
        const getAgent = await this.databaseService.agentRepository.findOne({
            where: {
                id: payload.id,
                isDelete: false
            }
        })
        if (!getAgent) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have id'
            })
        }
        const updateData = {
            name: body.name ? body.name : getAgent.name,
            email: body.email ? body.email : getAgent.email,
            phone: body.phone ? body.phone : getAgent.phone
        }

        const Result = await this.databaseService.agentRepository.update(getAgent.id, updateData)

        return {
            id: getAgent.id
        }
    }

    async resetPassword(payload, body: ResetPasswordInput): Promise<ResetPasswordOutput> {
        const getAgent = await this.databaseService.agentRepository.findOne({
            where: {
                id: payload.id,
                isDelete: false
            }
        })
        if (!getAgent) {
            throw new BadRequestException({
                code: 400,
                message: 'Not have id'
            })
        }
        const hashOldPassword = crypto.createHash('MD5').update(body.currentpassword).digest('hex')
        if (getAgent.password !== hashOldPassword) {
            throw new BadRequestException({
                code: 400,
                message: 'Incorrect password'
            })
        }
        if (body.newpassword !== body.confirmnewpassword) {
            throw new BadRequestException({
                code: 400,
                message: 'Please confirm the passwords match.'
            })
        }
        const updateData = {
            password: body.newpassword ? crypto.createHash('MD5').update(body.newpassword).digest('hex') : getAgent.password
        }

        const Result = await this.databaseService.agentRepository.update(getAgent.id, updateData)

        return {
            id: getAgent.id
        }
    }
}
