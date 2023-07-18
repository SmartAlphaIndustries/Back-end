import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  NotFoundError,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime';
import { deleteElement } from '../helpers/arrayManagement';
import { PRISMA } from '../commons/constants';
import { ORMService } from '../orm/orm.service';
import {
  AddOrDeleteUserDto,
  CreateAudienceDto,
  DeleteAudienceDto,
} from './dto';
import { AUDIENCE_ERRORS } from './audience.constants';

@Injectable()
export class AudienceService {
  constructor(private db: ORMService) {}

  async createAudience(dto: CreateAudienceDto) {
    try {
      const createdAudience = await this.db.audience.create({
        data: {
          title: dto.title,
          group: dto.group,
        },
      });
      return { data: createdAudience };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        [
          PRISMA.ERRORS.DB_CONSTRAINT,
          PRISMA.ERRORS.FOREIGN_KEY_CONSTRAINT,
          PRISMA.ERRORS.UNIQUE_CONSTRAINT,
        ].includes(error.code)
      ) {
        throw new BadRequestException(
          AUDIENCE_ERRORS.ERRORS.UNPROCESSABLE.description,
        );
      }
      throw error;
    }
  }

  async addUser(dto: AddOrDeleteUserDto) {
    try {
      const response = await this.db.audience.findFirst({
        where: {
          id: dto.audienceId,
        },
        select: {
          group: true,
        },
      });
      if (response) {
        await this.db.audience.update({
          where: {
            id: dto.audienceId,
          },
          data: {
            group: {
              push: dto.userId,
            },
          },
        });
      }
      return { data: response };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(
          AUDIENCE_ERRORS.ERRORS.NOTFOUND.description,
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
        throw new BadRequestException(
          AUDIENCE_ERRORS.ERRORS.UNPROCESSABLE.description,
        );
      }
      throw error;
    }
  }

  async deleteUser(dto: AddOrDeleteUserDto) {
    try {
      const deletedUserArray = await this.db.audience.findFirst({
        where: {
          id: dto.audienceId,
        },
        select: {
          group: true,
        },
      });
      if (deletedUserArray) {
        const newArray = deleteElement(dto.userId, deletedUserArray.group);
        await this.db.audience.update({
          where: {
            id: dto.audienceId,
          },
          data: {
            group: newArray,
          },
        });
      }
      return { data: deletedUserArray };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(
          AUDIENCE_ERRORS.ERRORS.NOTFOUND.description,
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
        throw new BadRequestException(
          AUDIENCE_ERRORS.ERRORS.UNPROCESSABLE.description,
        );
      }
      throw error;
    }
  }

  async deleteAudience(dto: DeleteAudienceDto) {
    try {
      const response = await this.db.audience.delete({
        where: {
          id: dto.audienceId,
        },
        select: {
          id: true,
        },
      });
      return { data: response };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(
          AUDIENCE_ERRORS.ERRORS.NOTFOUND.description,
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
        throw new BadRequestException(
          AUDIENCE_ERRORS.ERRORS.UNPROCESSABLE.description,
        );
      }
      throw error;
    }
  }
}
