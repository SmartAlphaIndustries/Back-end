import { Module } from '@nestjs/common';
import { AudienceService } from './audience.service';
import { AudienceController } from './audience.controller';
import { ORMModule } from '../orm/orm.module';
import { ConfigService } from '@nestjs/config';
import { ORMService } from '../orm/orm.service';

@Module({
  controllers: [AudienceController],
  imports: [ORMModule],
  providers: [AudienceService, ConfigService, ORMService]
})
export class AudienceModule {}
