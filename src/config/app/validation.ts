import { ValidationPipeOptions } from '@nestjs/common';

export const validationPipeOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  stopAtFirstError: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
};
