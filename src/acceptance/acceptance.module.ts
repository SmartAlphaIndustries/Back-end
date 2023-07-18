import { Module } from '@nestjs/common';
import { AcceptanceService } from './acceptance.service';
import { AcceptanceController } from './acceptance.controller';
import { ORMModule } from '../orm/orm.module';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AcceptanceController],
  providers: [AcceptanceService, ConfigService],
  imports: [ORMModule]
})
export class AcceptanceModule {}
