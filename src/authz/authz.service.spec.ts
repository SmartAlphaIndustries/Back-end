import { Test } from '@nestjs/testing';
import { UserPersonalInfo } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';
import { ORMService } from '../orm/orm.service';
import { signupStub } from './__mocks__/signup';
import { AuthzService } from './authz.service';
import { NotFoundError, PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PRISMA } from '../commons/prisma.constants';
import { UserService } from '../user/user.service';
import { AudienceService } from '../audience/audience.service';

describe('AuthzService', () => {
  let ormService: ORMService;
  let authService: AuthzService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthzService, UserService, AudienceService,
        {
          provide: ORMService,
          useValue: mockDeep<ORMService>(),
        },
      ],
    }).compile();

    ormService = moduleRef.get<ORMService>(ORMService);

    authService = moduleRef.get<AuthzService>(AuthzService);
  });


  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('Create a socialMedia object', () => {
    describe('When createSocialMedia is called in socialMedia service', () => {
      let response: UserPersonalInfo;
      let signupDto: any;
      let ageCalculated: number;
      let birthDayCalculated: Date;

      /* beforeAll(async () => {
        signupDto = {
          email: signupStub().email,
          names: signupStub().names,
          maternalSurname: signupStub().maternalSurname,
          paternalSurname: signupStub().paternalSurname,
          phone: signupStub().phone,
          recoveryEmail: signupStub().recoveryEmail,
          city: signupStub().city,
          username: signupStub().username,
          avatar: signupStub().avatar,
        };
        const { data } = await authService.signup(signupDto, ageCalculated, birthDayCalculated);
        
        response = data;
      }); */
      

      test('It must return the created user object', async () => {
        ormService.userPersonalInfo.create = jest
          .fn()
          .mockResolvedValue(signupStub());
        const { data } = await authService.signup(
          signupStub(), ageCalculated, birthDayCalculated,
        );
        expect(data).toMatchObject(signupStub());
      });

      test('Then it must call create method in orm', async () => {
        ormService.userPersonalInfo.create = jest
          .fn()
          .mockResolvedValue(signupStub());
        const { data } = await authService.signup(
          signupStub(), ageCalculated, birthDayCalculated,
        );
        expect(ormService.userPersonalInfo.create).toHaveBeenCalledTimes(1);
      });

      test('If it does not find socialMedia it throws a NotFoundException', async () => {
        ormService.userPersonalInfo.create = jest.fn().mockImplementation(() => {
          throw new NotFoundError('');
        });
        const promise = authService.signup(signupStub(), ageCalculated, birthDayCalculated,);
        await expect(promise).rejects.toThrow(NotFoundException);
      });

      test('If create  throws an error related with a db constraint it throws a UnprocessableEntityException', async () => {
        ormService.userPersonalInfo.findUniqueOrThrow = jest
          .fn()
          .mockResolvedValue(signupStub());
        ormService.userPersonalInfo.create = jest.fn().mockImplementation(() => {
          throw new PrismaClientKnownRequestError(
            '',
            PRISMA.ERRORS.FOREIGN_KEY_CONSTRAINT,
            '',
          );
        });
        const promise = authService.signup(signupStub(), ageCalculated, birthDayCalculated,);
        await expect(promise).rejects.toThrow(BadRequestException);
      });

      test('It must throw back any other error', async () => {
        ormService.userPersonalInfo.findUniqueOrThrow = jest
          .fn()
          .mockResolvedValue(signupStub());
        ormService.userPersonalInfo.create = jest.fn().mockImplementation(() => {
          throw new Error('');
        });
        const promise = authService.signup(signupStub(), ageCalculated, birthDayCalculated,);
        await expect(promise).rejects.toThrow(Error);
      });
    });
  });
});
