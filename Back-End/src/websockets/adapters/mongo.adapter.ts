import {IoAdapter} from "@nestjs/platform-socket.io";
import {Logger} from "@nestjs/common";
import * as mongoAdapter from 'socket.io-adapter-mongo'
import Config from "../../apps/configuration";

export class MongoAdapter extends IoAdapter {

    // private mongoDB: string

    // createIOServer(port: number, options?: any): any {
    //     this.mongoDB = Config().mongodb
    //     Logger.debug(`Port Socket: ${port}`)
    //     Logger.debug(`MongoDB: ${this.mongoDB}`)
    //     const server = super.createIOServer(port, options);
    //     const mongodbAdapter = mongoAdapter(this.mongoDB)
    //     server.adapter(mongodbAdapter);
    //     return server;
    // }
}
