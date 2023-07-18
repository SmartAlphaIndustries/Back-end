import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  NotFoundError,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime';
import { PRISMA } from '../commons/constants';
import { ORMService } from '../orm/orm.service';
import { ACCEPTANCE } from './acceptance.constants';
import { CreateAcceptanceDto, UpdateAcceptanceDto } from './dto';

@Injectable()
export class AcceptanceService {
  constructor(private db: ORMService) {}

  async createAcceptance(dto: CreateAcceptanceDto) {
    try {
      const createdAcceptance = await this.db.acceptance.create({
        data: {
          ...dto,
        },
      });

      return { data: createdAcceptance };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(ACCEPTANCE.ERRORS.NOTFOUND.description);
      }
      if (
        error instanceof PrismaClientKnownRequestError &&
        [
          PRISMA.ERRORS.DB_CONSTRAINT,
          PRISMA.ERRORS.FOREIGN_KEY_CONSTRAINT,
          PRISMA.ERRORS.UNIQUE_CONSTRAINT,
        ].includes(error.code)
      ) {
        throw new BadRequestException(
          ACCEPTANCE.ERRORS.UNPROCESSABLE.description,
        );
      }
      throw error;
    }
  }

  async deleteAcceptance(id: string) {
    try {
      const response = await this.db.acceptance.delete({
        where: {
          id,
        },
      });
      return { data: response };
    } catch (error) {
      throw error;
    }
  }

  async getAcceptanceById(id: string) {
    try {
      const response = await this.db.acceptance.findUniqueOrThrow({
        where: {
          id,
        },
      });
      return { data: response };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(ACCEPTANCE.ERRORS.NOTFOUND);
      }
      throw error;
    }
  }

  async updateAcceptance(dto: UpdateAcceptanceDto, id: string) {
    try {
      const acceptance = await this.db.acceptance.update({
        where: {
          id,
        },
        data: {
         title: dto.title,
         template: dto.template,
         version: dto.version,
        },
      });
      return { data: acceptance };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA.ERRORS.REQUIRED_RECORDS_NOTFOUND
      ) {
        throw new NotFoundException(
          ACCEPTANCE.ERRORS.NOTFOUND.description,
        );
      }
      if (
        error instanceof PrismaClientKnownRequestError &&
        [
          PRISMA.ERRORS.DB_CONSTRAINT,
          PRISMA.ERRORS.FOREIGN_KEY_CONSTRAINT,
          PRISMA.ERRORS.UNIQUE_CONSTRAINT,
        ].includes(error.code)
      ) {
        throw new UnprocessableEntityException(
          ACCEPTANCE.ERRORS.UNPROCESSABLE.description,
        );
      }
      throw error;
    }
  }
}
