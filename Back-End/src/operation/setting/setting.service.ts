import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {ShareService} from "../../share/share.service";
import {ResetPasswordInput} from "../../admin/setting/dto/ResetPassword.input";
import {LoginOutput} from "../../dto/Login.output";
import * as crypto from "crypto";
import * as randtoken from "rand-token";
import {SettingProfileInput} from "../../admin/setting/dto/SettingProfile.input";
import {DatabaseService} from "../../database/database.service";

@Injectable()
export class SettingService {
    constructor(
        private databaseService: DatabaseService,
        private shareService: ShareService
    ) {
    }

    async ResetPassword(payload, body: ResetPasswordInput): Promise<LoginOutput> {
        const getData = await this.databaseService.adminRepository.findOne(payload.id)
        const hashPassword = crypto.createHash('MD5').update(body.currentpassword).digest('hex')
        if (getData.password !== hashPassword) {
            throw new BadRequestException({
                code: 400,
                message: 'The current password is not correct.'
            })
        }
        if (body.newpassword !== body.confirmnewpassword) {
            throw new BadRequestException({
                code: 400,
                message: 'Please confirm the password to match.'
            })
        }
        const hashNewPassword = crypto.createHash('MD5').update(body.newpassword).digest('hex')
        const updateData = {
            password: hashNewPassword,
            token: randtoken.generate(256)
        }
        const Result = await this.databaseService.adminRepository.update(getData.id, updateData)
        const PayloadSignToken = {
            id: getData.id,
            role: 'operation',
            token: updateData.token,
            ip: payload.ip
        }
        const SignToken = await this.shareService.authService.getToken(PayloadSignToken)
        return SignToken
    }

    async SettingProfile(payload, body: SettingProfileInput) {
        const getData = await this.databaseService.adminRepository.findOne(payload.id)
        if (body.email && body.email !== getData.email) {
            const checkEmail = await this.databaseService.adminRepository.findOne({
                email: body.email
            })
            if (checkEmail) {
                throw new InternalServerErrorException({
                    code: 500,
                    message: 'Can not use email'
                })
            }
        }

        if (body.phone && body.phone !== getData.phone) {
            const checkPhone = await this.databaseService.adminRepository.findOne({
                phone: body.phone
            })
            if (checkPhone) {
                throw new InternalServerErrorException({
                    code: 500,
                    message: 'Can not use phone'
                })
            }
        }
        const updateData = {
            name: body.name ? body.name : getData.name,
            phone: body.phone ? body.phone : getData.phone,
            email: body.email ? body.email : getData.email
        }
        const Result = await this.databaseService.adminRepository.update(getData.id, updateData)
        return {
            id: getData.id,
            name: updateData.name,
            phone: updateData.phone,
            email: updateData.email
        }
    }
}
