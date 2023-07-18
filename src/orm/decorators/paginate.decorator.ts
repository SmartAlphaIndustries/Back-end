import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import getQueryDescriptor from '../helpers/getQueryDescriptor';

const DEFAULT_PAGE = 1;
const DEFAULT_MINIMUM_PAGE = 1;
const DEFAULT_PAGE_SIZE = 30;
const DEFAULT_MINIMUM_PAGE_SIZE = 1;
const DEFAULT_MAXIMUM_PAGE_SIZE = 30;

export const Paginate = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const { query } = ctx.switchToHttp().getRequest();
    return {
      page: query.page ? parseInt(query.page.toString(), 10) : undefined,
      limit: query.limit ? parseInt(query.limit.toString(), 10) : undefined,
    };
  },
  [
    (target: any, key: string) => {
      const queryDescriptor = getQueryDescriptor(target, key);

      ApiQuery({
        name: 'page',
        schema: {
          default: DEFAULT_PAGE,
          type: 'number',
          minimum: DEFAULT_MINIMUM_PAGE,
        },
        required: false,
      })(target, key, queryDescriptor);
      ApiQuery({
        name: 'limit',
        schema: {
          default: DEFAULT_PAGE_SIZE,
          type: 'number',
          minimum: DEFAULT_MINIMUM_PAGE_SIZE,
          maximum: DEFAULT_MAXIMUM_PAGE_SIZE,
        },
        required: false,
      })(target, key, queryDescriptor);
    },
  ],
);
