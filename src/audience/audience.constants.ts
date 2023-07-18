import { ERRORS, ICommons } from '../commons/commons.types';

export const AUDIENCE_ERRORS: ICommons = {
  ERRORS: {
    NOTFOUND: {
      type: ERRORS.notfound,
      description: 'The audience or required records were not found',
    },
    BADREQUEST: {
      type: ERRORS.badRequest,
      description:
        'It is not possible to perform the action on audience due to a bad request',
    },
    UNPROCESSABLE: {
      type: ERRORS.unprocessable,
      description:
        'It is not possible to focus an audience entry due to db constraints',
    },
  },
};
