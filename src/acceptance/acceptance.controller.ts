import { Controller, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Endpoint } from '../authz/authz.decorator';
import { CreateAcceptanceDto, UpdateAcceptanceDto, schemaCreateAcceptanceDto, schemaUpdateAcceptanceDto } from './dto';
import { COMMONS } from '../commons/commons.constants';
import { METHODS } from '../commons/commons.types';
import { AcceptanceService } from './acceptance.service';
import { ACCEPTANCE } from './acceptance.constants';


@ApiTags('Acceptance')
@Controller('acceptance')
export class AcceptanceController {
  constructor(private acceptanceService: AcceptanceService) {}

  @Endpoint({
    method: METHODS.POST,
    response: 'Returns the acceptance created inside a data property',
    summary: 'Create a new entry on acceptance document',
    body: schemaCreateAcceptanceDto.CreateAcceptanceDto,
    errors: [
      COMMONS.ERRORS.FORBIDDEN,
      ACCEPTANCE.ERRORS.NOTFOUND,
      ACCEPTANCE.ERRORS.BADREQUEST,
      ACCEPTANCE.ERRORS.UNPROCESSABLE,
    ],
  })
  createAcceptance(@Body() dto: CreateAcceptanceDto) {
    return this.acceptanceService.createAcceptance(dto);
  }

  @Endpoint({
    method: METHODS.GET,
    response: 'It must return the found acceptance by its ID',
    summary: 'This endpoint queries an acceptance by its id',
    endpoint: ':id',
    errors: [COMMONS.ERRORS.FORBIDDEN, ACCEPTANCE.ERRORS.NOTFOUND],
  })
  getAcceptanceById(@Param('id') id: string) {
    return this.acceptanceService.getAcceptanceById(id);
  }

  @Endpoint({
    method: METHODS.PATCH,
    endpoint: ':id',
    response: 'Acceptance updated successfully',
    summary:
      'Updates the found acceptance in acceptance/acceptance service document',
    body: schemaUpdateAcceptanceDto.UpdateAcceptanceDto,
    errors: [
      COMMONS.ERRORS.FORBIDDEN,
      ACCEPTANCE.ERRORS.NOTFOUND,
      ACCEPTANCE.ERRORS.UNPROCESSABLE,
    ],
  })

  updateAcceptance(
    @Param('id') id: string,
    @Body() dto: UpdateAcceptanceDto,
  ) {
    return this.acceptanceService.updateAcceptance(dto, id);
  }

  @Endpoint({
    method: METHODS.DELETE,
    endpoint: ':id',
    response: 'Acceptance deleted successfully',
    summary: 'This endpoint deletes an acceptance document',
    errors: [COMMONS.ERRORS.FORBIDDEN, ACCEPTANCE.ERRORS.NOTFOUND],
  })
  deleteAcceptance(@Param('id') id: string) {
    return this.acceptanceService.deleteAcceptance(id);
  }
}
