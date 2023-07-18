import getPaginateResult from './getPaginateResult';
import { ormMockResult } from '../__mocks__/ormMockResult';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export const ormMock = {
  findMany: jest.fn((options: any) => {
    const found = ormMockResult().slice(
      options.skip,
      options.skip + options.take,
    );
    return found;
  }),
  count: jest.fn().mockReturnValue(ormMockResult().length),
};

describe('getPaginateResult', () => {
  it('should paginate one by one', async () => {
    const response = await getPaginateResult(
      ormMock,
      {},
      { page: 1, limit: 1 },
    );
    expect(ormMock.findMany).toBeCalledWith({ skip: 0, take: 1 });
    expect(response).toBeTruthy();
    expect(response.data).toBeTruthy();
    expect(response.data.length).toBe(1);
    expect(response.data).toEqual([1]);
    expect(response.meta).toEqual({
      total: 6,
      lastPage: 6,
      currentPage: 1,
      perPage: 1,
      prev: null,
      next: 2,
    });
  });

  it('should return next prop equal to page + 1 if page < lastPage', async () => {
    const response = await getPaginateResult(
      ormMock,
      {},
      { page: 1, limit: 3 },
    );
    expect(response.meta.next).toBe(2);
  });

  it('should return next prop equal to null if page >= lastPage', async () => {
    const response = await getPaginateResult(
      ormMock,
      {},
      { page: 3, limit: 3 },
    );
    expect(response.meta.next).toBe(null);
  });

  it('should return perPage equal to default value (10) if there is no limit', async () => {
    const response = await getPaginateResult(ormMock, {}, { page: 3 });
    expect(response.meta.perPage).toBe(30);
  });

  it('should return perPage equal to limit value if this is defined', async () => {
    const response = await getPaginateResult(
      ormMock,
      {},
      { page: 1, limit: 2 },
    );
    expect(response.meta.perPage).toBe(2);
  });

  it('should return perPage equal to limit if page and limit are defined in the default values and not in query params', async () => {
    const response = await getPaginateResult(ormMock, {}, {});
    expect(response.meta.perPage).toBe(30);
  });

  it('should return perPage equal to limit if it is defined in the default values and not in query params', async () => {
    const response = await getPaginateResult(ormMock, {}, {});
    expect(response.meta.perPage).toBe(30);
  });

  it('should return perPage equal to limit if it is not defined in the default values but in query params', async () => {
    const response = await getPaginateResult(ormMock, {}, { limit: 2 });
    expect(response.meta.perPage).toBe(2);
  });

  it('should return bad request error', async () => {
    const ormErrorMock = {
      findMany: jest
        .fn()
        .mockRejectedValueOnce(
          new PrismaClientKnownRequestError('', 'P2023', ''),
        ),
      count: jest.fn().mockReturnValue(ormMockResult().length),
    };
    await expect(
      getPaginateResult(ormErrorMock, {}, { limit: 2 }),
    ).rejects.toThrow();
  });

  it('should throw an errr', async () => {
    const ormErrorMock = {
      findMany: jest.fn().mockRejectedValueOnce(new Error()),
      count: jest.fn(),
    };
    await expect(
      getPaginateResult(ormErrorMock, {}, { limit: 2 }),
    ).rejects.toThrow();
  });
});
