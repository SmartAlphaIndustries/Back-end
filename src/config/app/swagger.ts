import { DocumentBuilder } from '@nestjs/swagger';

export const APIDocumentConfig = new DocumentBuilder()
  .setTitle('Alpha Smart App API')
  .setDescription('This API provides CRUD operations to "Alpha Smart App".')
  .setVersion(process.env.npm_package_version || '')
  // .addApiKey(null, 'api-key')
  .addBearerAuth()
  .build();
