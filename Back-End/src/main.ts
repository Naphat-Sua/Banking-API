import {NestFactory} from '@nestjs/core'
import {AppModule} from './apps/app.module'
import * as helmet from 'helmet'
import {ValidationPipe} from '@nestjs/common'
import {json} from 'body-parser'
import * as compression from 'compression';
import {MongoAdapter} from './websockets/adapters/mongo.adapter'
import apiDocsNoVersion from './swagger/apiDocsNoVersion'
import apiDocsV1Banktransfer from './swagger/apiDocsV1Banktransfer'
import apiDocsV1BanktransferHuay from './swagger/apiDocsV1BanktransferHuay'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose']
  })
  // app.enableCors();
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
  });
  app.use(helmet())
  app.use(json({limit: '100mb'}))
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  app.useWebSocketAdapter(new MongoAdapter(app));
  apiDocsNoVersion(app)
  apiDocsV1Banktransfer(app)
  apiDocsV1BanktransferHuay(app)
  await app.listen(8000, '0.0.0.0');
  console.log('Start System Success listening port:8000. http://admin.localhost')
}

bootstrap()
