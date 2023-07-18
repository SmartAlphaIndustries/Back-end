import {
  Body,
  Controller
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { METHODS } from '../commons/commons.types';
import { AUTH_CONSTANTS_ERRORS } from './authz.constants';
import { SignUpDto, schemas } from './dto';
import { AuthzService } from './authz.service';
import { Endpoint } from './authz.decorator';
import { getAge } from '../helpers/timeManagement';

@Controller('authz')
@ApiTags('AuthZ')
@ApiConsumes('application/json')
export class AuthzController {
  constructor(private auth: AuthzService) {}

  @Endpoint({
    method: METHODS.POST,
    endpoint: 'signup',
    response: 'User has been created succesfully',
    summary: 'Create a new entry on User document.',
    body: schemas.SignUpDto,
    errors: [
      AUTH_CONSTANTS_ERRORS.ERRORS.FORBIDDEN,
      AUTH_CONSTANTS_ERRORS.ERRORS.UNPROCESSABLE,
      AUTH_CONSTANTS_ERRORS.ERRORS.NOTFOUND_USER,
    ],
  })
  signup(@Body() dto: SignUpDto) {
    const { calculatedBirthday, calculatedAge } = getAge(
      dto.fullYear,
      dto.month,
      dto.day,
    );
    return this.auth.signup(dto, calculatedAge, calculatedBirthday);
  }
}
