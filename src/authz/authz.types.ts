import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { ERRORS, METHODS } from '../commons/commons.types';

export interface IToken {
  iss: string;
  sub: string;
  aud: string;
  iat: number;
  exp: number;
  azp: string;
  gty: string;
  permissions: string[];
  'ASManufacturing/roles': string[];
  'ASManufacturing/email': string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      user?: IToken;
    }
  }
}

export interface IAuthDecorators {
  permission: string;
}

export type TEndpoint = {
  method: METHODS;
  endpoint?: string;
  response?: string;
  summary?: string;
  body?: SchemaObject;
  auth?: boolean | IAuthDecorators;
  errors?: Array<{ type: ERRORS; description: string }>;
};
