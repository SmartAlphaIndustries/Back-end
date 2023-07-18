import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './jwt.strategy';
import { AuthzController } from './authz.controller';
import { AuthzService } from './authz.service';
import { ORMModule } from '../orm/orm.module';
import { AudienceService } from '../audience/audience.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), ORMModule],
  providers: [ConfigService, JwtStrategy, AuthzService, AudienceService],
  exports: [PassportModule],
  controllers: [AuthzController],
})
export class AuthzModule {}
