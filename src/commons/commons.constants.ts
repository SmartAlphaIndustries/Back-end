import { ICommons, ERRORS } from './commons.types';

export const COMMONS: ICommons = {
  ERRORS: {
    FORBIDDEN: {
      type: ERRORS.forbidden,
      description: 'Unauthorized request',
    },
    UNAVAILABLE: {
      type: ERRORS.unavailable,
      description: 'Unavailable',
    },
    NOTFOUND: {
      type: ERRORS.notfound,
      description: 'Not found',
    },
    BADREQUEST: {
      type: ERRORS.badRequest,
      description: 'Bad request',
    },
  },
};
