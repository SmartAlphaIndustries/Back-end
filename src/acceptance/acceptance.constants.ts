import { ERRORS, ICommons } from '../commons/commons.types';

export const ACCEPTANCE: ICommons = {
  ERRORS: {
    NOTFOUND: {
      type: ERRORS.notfound,
      description: 'The acceptance or required records were not found',
    },
    BADREQUEST: {
      type: ERRORS.badRequest,
      description:
        'It is not possible to perform the action on acceptance due to a bad request',
    },
    UNPROCESSABLE: {
      type: ERRORS.unprocessable,
      description:
        'It is not possible to create an acceptance entry due to db constraints',
    },
  },
};
