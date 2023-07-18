import { ICommons, ERRORS } from '../commons/commons.types';

export const USER_CONSTANTS_ERRORS: ICommons = {
  ERRORS: {
    FORBIDDEN: {
      type: ERRORS.forbidden,
      description: 'Credentials taken',
    },
    UNPROCESSABLE: {
      type: ERRORS.unprocessable,
      description: 'Entity already exists',
    },
    NOTFOUND_USER: {
      type: ERRORS.notfound,
      description: 'The user was not found',
    },
    NOT_FOUND_NAME: {
      type: ERRORS.notfoundname,
      description: 'The name was not found',
    },
  },
};
