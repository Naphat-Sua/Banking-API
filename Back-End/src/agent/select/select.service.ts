import {Injectable} from '@nestjs/common';
import {DatabaseService} from "../../database/database.service";
import {SelectOutput} from "./dto/select.output";

@Injectable()
export class SelectService {
    constructor(
        private databaseService: DatabaseService
    ) {
    }

    async selectCustomer(payload): Promise<SelectOutput[]> {
        const getData = await this.databaseService.customerRepository.find({
            where: {
                agentId: payload.id,
                isDelete: false
            }
        })
        return getData.map(value => {
            return {
                value: value.id,
                label: value.username
            }
        })
    }
}
