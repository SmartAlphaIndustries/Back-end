import { ORMService } from '../orm/orm.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { USER_CONSTANTS_ERRORS } from './user.constants';
import {
  NotFoundError,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime';
import { PRISMA } from '../commons/prisma.constants';
import { AudienceService } from '../audience/audience.service';
import { deleteUsersFromAudiences } from '../helpers/arrayManagement';
import { UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private db: ORMService,
    private audienceService: AudienceService,
  ) {}

  async getUserById(dto: UserDto) {
    try {
      const user = await this.db.user.findFirst({
        where: {
          id: dto.userId,
        },
      });
      return { data: user };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(
          USER_CONSTANTS_ERRORS.ERRORS.NOTFOUND_USER.description,
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
          USER_CONSTANTS_ERRORS.ERRORS.UNPROCESSABLE.description,
        );
      }
      throw error;
    }
  }

  async deleteUserByUserId(dto: UserDto) {
    try {
      const deletedUserId = await this.db.user.delete({
        where: {
          id: dto.userId,
        },
        select: {
          id: true,
        },
      });

      const audienceIds = await this.db.audience.findMany({
        where: {
          group: { hasSome: [dto.userId] },
        },
        select: {
          id: true,
          group: true,
        },
      });
      deleteUsersFromAudiences(audienceIds, dto, this.audienceService);
      return { data: deletedUserId };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(
          USER_CONSTANTS_ERRORS.ERRORS.NOTFOUND_USER.description,
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
          USER_CONSTANTS_ERRORS.ERRORS.UNPROCESSABLE.description,
        );
      }
      throw error;
    }
  }
}
