import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import {
  HttpArgumentsHost,
  CustomParamFactory,
  ExecutionContext,
} from '@nestjs/common/interfaces';
import { Request as ExpressRequest } from 'express';
import { IPaginateQuery } from '../interfaces/paginateQuery';
import { Paginate } from './paginate.decorator';

// eslint-disable-next-line @typescript-eslint/ban-types
function getPaginateQueryFactory<T>(decorator: Function): CustomParamFactory {
  class Test {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public test(@decorator() _value: T): void {
      //
    }
  }
  const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test');
  return args[Object.keys(args)[0]].factory;
}

const decoratorfactory = getPaginateQueryFactory<IPaginateQuery>(Paginate);

function expressContextFactory(
  query: ExpressRequest['query'],
): Partial<ExecutionContext> {
  const mockContext: Partial<ExecutionContext> = {
    switchToHttp: (): HttpArgumentsHost =>
      Object({
        getRequest: (): Partial<ExpressRequest> =>
          Object({
            protocol: 'http',
            get: () => 'localhost',
            originalUrl: '/items',
            query: query,
          }),
      }),
  };
  return mockContext;
}

describe('Decorator', () => {
  it('should handle express defined query fields', () => {
    const context = expressContextFactory({
      page: '1',
      limit: '2',
    });

    const result: IPaginateQuery = decoratorfactory(null, context);

    expect(result).toStrictEqual({
      page: 1,
      limit: 2,
    });
  });

  it('should return page value as undefined if this is not in the query paras', () => {
    const context = expressContextFactory({
      limit: '2',
    });

    const result: IPaginateQuery = decoratorfactory(null, context);

    expect(result).toStrictEqual({
      page: undefined,
      limit: 2,
    });
  });

  it('should return limit value as undefined if this is not in the query paras', () => {
    const context = expressContextFactory({
      page: '1',
    });

    const result: IPaginateQuery = decoratorfactory(null, context);

    expect(result).toStrictEqual({
      page: 1,
      limit: undefined,
    });
  });
});
