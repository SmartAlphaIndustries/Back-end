import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { PinoLogger, Logger, LoggerErrorInterceptor } from 'nestjs-pino';

import {
  APIDocumentConfig,
} from './config/app';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const logger = await app.resolve(PinoLogger);
  const config = app.get<ConfigService>(ConfigService);

  app.disable('x-powered-by');

  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.setGlobalPrefix('v1');
  app.enableShutdownHooks();

  if (config.get('env') !== 'production') {
    const document = SwaggerModule.createDocument(app, APIDocumentConfig);
    SwaggerModule.setup('api-docs', app, document);
  }  


  await app.listen(config.get('app.port') || 4444, '0.0.0.0');

  logger.info(
    `🚀 Application is running on: ${await app.getUrl()}`,
    'Bootstrap',
  );
}
bootstrap();
