import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  NotFoundError,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime';
import { AUTH_CONSTANTS_ERRORS } from './authz.constants';
import { PRISMA } from '../commons/constants';
import { ORMService } from '../orm/orm.service';
import { SignUpDto } from './dto';

@Injectable()
export class AuthzService {
  constructor(private db: ORMService) {}

  async signup(
    dto: SignUpDto,
    ageCalculated: number,
    birthDayCalculated: Date,
  ) {
    try {
      const createdUser = await this.db.userPersonalInfo.create({
        data: {
          email: dto.email,
          names: dto.names,
          maternalSurname: dto.maternalSurname,
          paternalSurname: dto.paternalSurname,
          birthDay: birthDayCalculated,
          age: ageCalculated,
          recoveryEmail: dto.recoveryEmail,
          phone: dto.phone,
          city: dto.city,
          username: dto.username,
          avatar: dto.avatar,
          user: {
            create: {
              acceptances: {
                create: [
                  {
                    acceptanceId: dto.acceptance,
                    accepted: true,
                  },
                ],
              },
            },
          },
        },
      });

      return { data: createdUser };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(
          AUTH_CONSTANTS_ERRORS.ERRORS.NOTFOUND_USER.description,
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
          AUTH_CONSTANTS_ERRORS.ERRORS.UNPROCESSABLE.description,
        );
      }
      throw error;
    }
  }
}
