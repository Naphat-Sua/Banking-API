import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {IndexModule} from "../api/index/index.module";

export default (app) => {
    const optionsApi = new DocumentBuilder()
        .setTitle('API Docs')
        .setVersion('0')
        .build();
    const documentApi = SwaggerModule.createDocument(app, optionsApi, {
        include: [IndexModule]
    });
    SwaggerModule.setup('docs/api/noversion', app, documentApi);
}
