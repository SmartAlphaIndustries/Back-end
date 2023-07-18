import {
    applyDecorators,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Patch,
    Post,
    Put,
    SetMetadata,
    UseGuards,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';

  import {
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiServiceUnavailableResponse,
    ApiUnauthorizedResponse,
    ApiUnprocessableEntityResponse,
  } from '@nestjs/swagger';
  
  import { IAuthDecorators, TEndpoint } from './types';
  import { PermissionsGuard } from './permissions.guard';
  
  const authDecorators = (auth: boolean | IAuthDecorators) => {
    const decorators = [
      UseGuards(AuthGuard('jwt'), PermissionsGuard),
      ApiUnauthorizedResponse({ description: 'Unauthorized' }),
      ApiBearerAuth(),
    ];
  
    if (typeof auth !== 'boolean' && auth?.permission) {
      decorators.push(SetMetadata('permissions', auth.permission));
    }
  
    return decorators;
  };
  
  export const JSONSchema = (schema) => {
    try {
      return ApiBody(schema);
    } catch (e) {
      throw new Error(`Invalid JSON Schema for Swagger: ${e.message}`);
    }
  };
  
  const Endpoint = function ({
    method,
    endpoint = '',
    response = '',
    summary,
    body,
    auth,
    errors,
  }: TEndpoint) {
    const decorators: MethodDecorator[] = [];
  
    if (summary) decorators.push(ApiOperation({ summary }));
    if (body)
      decorators.push(
        JSONSchema({
          schema: body,
        }),
      );
  
    const methodFunctions = {
      POST: () =>
        decorators.push(
          Post(endpoint),
          HttpCode(HttpStatus.CREATED),
          ApiCreatedResponse({ description: response }),
        ),
      GET: () =>
        decorators.push(
          Get(endpoint),
          HttpCode(HttpStatus.OK),
          ApiOkResponse({ description: response }),
        ),
      PUT: () =>
        decorators.push(
          Put(endpoint),
          HttpCode(HttpStatus.OK),
          ApiOkResponse({ description: response }),
        ),
      PATCH: () =>
        decorators.push(
          Patch(endpoint),
          HttpCode(HttpStatus.OK),
          ApiOkResponse({ description: response }),
        ),
      DELETE: () =>
        decorators.push(
          Delete(endpoint),
          HttpCode(HttpStatus.OK),
          ApiOkResponse({ description: response }),
        ),
    };
    methodFunctions[method]?.();
  
    const errorFunctions = {
      notfound: (description) =>
        decorators.push(ApiNotFoundResponse({ description })),
      forbidden: (description) =>
        decorators.push(ApiForbiddenResponse({ description })),
      unauthorized: (description) =>
        decorators.push(ApiUnauthorizedResponse({ description })),
      unavailable: (description) =>
        decorators.push(ApiServiceUnavailableResponse({ description })),
      unprocessable: (description) =>
        decorators.push(ApiUnprocessableEntityResponse({ description })),
    };
  
    if (errors)
      errors.forEach(({ type, description, }) =>
        errorFunctions[type]?.(description) 
      );
  
    if (auth) decorators.push(...authDecorators(auth));
  
    return applyDecorators(...decorators) as any;
  };
  
  export { Endpoint };
  