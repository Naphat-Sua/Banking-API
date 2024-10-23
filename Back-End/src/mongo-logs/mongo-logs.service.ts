import { Injectable } from '@nestjs/common';
import {Logs_request} from "../entities_logs/logs_request";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class MongoLogsService {
    constructor(
        @InjectRepository(Logs_request, 'mongodb_logs')
        public readonly logRequest: Repository<Logs_request>
    ) {
    }
}
