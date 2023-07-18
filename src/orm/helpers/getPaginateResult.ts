import { BadRequestException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { IPaginateQuery } from '../interfaces/paginateQuery';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 30;

const getPaginateResult = async (
  model: any,
  args: any,
  options: IPaginateQuery,
) => {
  const page = options.page || DEFAULT_PAGE;
  const perPage = options.limit || DEFAULT_LIMIT;

  const skip = perPage * (page - 1);
  const take = perPage;

  try {
    const [data, total] = await Promise.all([
      model.findMany({ ...args, take, skip }),
      model.count({ where: args.where }),
    ]);

    const lastPage = Math.ceil(total / perPage);
    const prev = page > 1 ? page - 1 : null;
    const next = page < lastPage ? page + 1 : null;

    return {
      data,
      meta: {
        total,
        lastPage,
        currentPage: page,
        perPage,
        prev,
        next,
      },
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      throw new BadRequestException();
    }
    throw error;
  }
};

export default getPaginateResult;
