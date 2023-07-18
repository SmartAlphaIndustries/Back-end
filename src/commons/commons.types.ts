export enum ERRORS {
  unauthorized = 'unauthorized',
  unavailable = 'unavailable',
  unprocessable = 'unprocessable',
  notfound = 'notfound',
  forbidden = 'forbidden',
  badRequest = 'badRequest',
  notacceptable = 'notacceptable',
}

export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface IError {
  [error: string]: {
    type: ERRORS;
    description: string;
  };
}

export interface ICommons {
  ERRORS: IError;
  [constant: string]: any;
}
