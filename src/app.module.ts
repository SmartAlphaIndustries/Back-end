import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import configuration from './config/configurations';

@Module({
  imports: [ConfigModule.forRoot({
    load: [configuration],
  }),
  LoggerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      forRoutes: ['*'],
      pinoHttp: {
        customProps: () => ({
          context: 'HTTP',
        }),
        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
              }
            : undefined,
        useLevelLabels: true,
        level: config.get<string>('env') !== 'production' ? 'debug' : 'info',
        prettyPrint: config.get<string>('env') !== 'production' && {
          colorize: true,
          levelFirst: true,
          translateTime: 'UTC:yyyy/mm/dd, hh:MM:ss TT Z',
        },
        redact: config.get<string[]>('logger.redact'),
      },
    }),
  }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
