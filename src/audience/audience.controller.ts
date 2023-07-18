import { Controller, Body } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Endpoint } from '../authz/authz.decorator';
import { METHODS } from '../commons/commons.types';
import { COMMONS } from '../commons/commons.constants';
import { AUDIENCE_ERRORS } from './audience.constants';
import { AudienceService } from './audience.service';
import {
  AddOrDeleteUserDto,
  CreateAudienceDto,
  DeleteAudienceDto,
  schemaDeleteAudienceDto,
  schemasAddOrDeleteUserDto,
  schemasCreateAudienceDto,
} from './dto';

@ApiTags('Audience')
@Controller('audience')
@ApiConsumes('application/json')
export class AudienceController {
  constructor(private readonly audienceService: AudienceService) {}

  @Endpoint({
    method: METHODS.POST,
    endpoint: '',
    response: 'Returns the audience created inside a data property',
    summary: 'Create a new entry on audience document',
    body: schemasCreateAudienceDto.CreateAudienceDto,
    errors: [
      COMMONS.ERRORS.FORBIDDEN,
      AUDIENCE_ERRORS.ERRORS.BADREQUEST,
      AUDIENCE_ERRORS.ERRORS.UNPROCESSABLE,
    ],
  })
  createAudience(@Body() dto: CreateAudienceDto) {
    return this.audienceService.createAudience(dto);
  }

  @Endpoint({
    method: METHODS.PUT,
    endpoint: 'addUser',
    response: 'Returns the new audience with the added user',
    summary: 'Pushes a user to an audience group',
    body: schemasAddOrDeleteUserDto.AddOrDeleteUserDto,
    errors: [
      COMMONS.ERRORS.FORBIDDEN,
      AUDIENCE_ERRORS.ERRORS.NOTFOUND,
      AUDIENCE_ERRORS.ERRORS.BADREQUEST,
      AUDIENCE_ERRORS.ERRORS.UNPROCESSABLE,
    ],
  })
  addUser(@Body() dto: AddOrDeleteUserDto) {
    return this.audienceService.addUser(dto);
  }

  @Endpoint({
    method: METHODS.PUT,
    endpoint: 'deleteUser',
    response: 'Returns the new audience without the deleted user',
    summary: 'Deletes a user from an audience group',
    body: schemasAddOrDeleteUserDto.AddOrDeleteUserDto,
    errors: [
      COMMONS.ERRORS.FORBIDDEN,
      AUDIENCE_ERRORS.ERRORS.NOTFOUND,
      AUDIENCE_ERRORS.ERRORS.BADREQUEST,
      AUDIENCE_ERRORS.ERRORS.UNPROCESSABLE,
    ],
  })
  deleteUser(@Body() dto: AddOrDeleteUserDto) {
    return this.audienceService.deleteUser(dto);
  }

  @Endpoint({
    method: METHODS.DELETE,
    endpoint: '',
    response: 'Returns the deleted audience id',
    summary: 'Deletes an audience',
    body: schemaDeleteAudienceDto.DeleteAudienceDto,
    errors: [
      COMMONS.ERRORS.FORBIDDEN,
      AUDIENCE_ERRORS.ERRORS.NOTFOUND,
      AUDIENCE_ERRORS.ERRORS.BADREQUEST,
      AUDIENCE_ERRORS.ERRORS.UNPROCESSABLE,
    ],
  })
  deleteAudience(@Body() dto: DeleteAudienceDto) {
    return this.audienceService.deleteAudience(dto);
  }
}
