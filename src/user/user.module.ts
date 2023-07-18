import { Module } from '@nestjs/common';
import { AuthzModule } from '../authz/authz.module';
import { UserController } from './user.controller';
import { ConfigService } from '@nestjs/config';
import { ORMService } from '../orm/orm.service';
import { UserService } from './user.service';
import { ORMModule } from '../orm/orm.module';
import { AudienceService } from '../audience/audience.service';

@Module({
  imports: [AuthzModule, ORMModule],
  controllers: [UserController],
  providers: [UserService, ORMService, ConfigService, AudienceService],
})
export class UserModule {}
