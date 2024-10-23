import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {BanktransferModule} from "../api/v1/banktransfer/banktransfer.module";

export default (app) => {
    const optionsApi = new DocumentBuilder()
        .setTitle('API Docs')
        .setVersion('1.0')
        .build();
    const documentApi = SwaggerModule.createDocument(app, optionsApi, {
        include: [BanktransferModule]
    });
    SwaggerModule.setup('docs/api/v1', app, documentApi);
}
