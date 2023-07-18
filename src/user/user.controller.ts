import { Body, Controller, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { METHODS } from '../commons/commons.types';
import { Endpoint } from '../authz/authz.decorator';
import { USER_CONSTANTS_ERRORS } from './user.constants';
import { UserService } from './user.service';
import { UserDto } from './dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Endpoint({
    method: METHODS.GET,
    endpoint: '',
    response: 'Returns the whole schema',
    summary: 'Get a  by id',
    errors: [
      USER_CONSTANTS_ERRORS.ERRORS.FORBIDDEN,
      USER_CONSTANTS_ERRORS.ERRORS.NOTFOUND_USER,
    ],
  })
  getUser(@Body() dto: UserDto) {
    return this.userService.getUserById(dto);
  }

   @Endpoint({
    method: METHODS.DELETE,
    endpoint: '',
    response: 'User was deleted successfully',
    summary: 'This endpoint deletes a user document',
    errors: [
      USER_CONSTANTS_ERRORS.ERRORS.FORBIDDEN,
      USER_CONSTANTS_ERRORS.ERRORS.NOTFOUND_USER,
    ],
  })
  deleteUserByUserId(@Body() dto: UserDto) {
    return this.userService.deleteUserByUserId(dto);
  } 
}
