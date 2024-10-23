import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {HuayModule} from "../api/v1/banktransfer/huay/huay.module";

export default (app) => {
    const optionsApi = new DocumentBuilder()
        .setTitle('Unipay API Docs')
        .setVersion('1.0')
        .build();
    const documentApi = SwaggerModule.createDocument(app, optionsApi, {
        include: [HuayModule]
    });
    SwaggerModule.setup('docs/api/v1/unipay', app, documentApi);
}
