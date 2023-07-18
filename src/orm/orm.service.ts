import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ORMService extends PrismaClient implements OnModuleInit {
  constructor(config: ConfigService) {
    const url = config.get<string>('database.mongodb.url');
    super({ datasources: { db: { url } } });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  cleanDb() {
    return this.$transaction([
      this.acceptance.deleteMany(),
      this.user.deleteMany(),
      this.userPersonalInfo.deleteMany(),
    ]);
  }
}
