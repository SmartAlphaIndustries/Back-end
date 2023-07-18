import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import {
  NotFoundError,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime';
import { mockDeep } from 'jest-mock-extended';
import { PRISMA } from '../commons/prisma.constants';
import { ORMService } from '../orm/orm.service';
import { UserService } from './user.service';
import {
  userDtoStub,
  userGetOrDeleteStub,
  userStub,
} from './__mocks__/user';
import { AudienceService } from '../audience/audience.service';

describe('User Service', () => {
  let ormService: ORMService;
  let userService: UserService;
  let audienceService: AudienceService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        AudienceService,
        {
          provide: ORMService,
          useValue: mockDeep<ORMService>(),
        },
      ],
    }).compile();
    ormService = moduleRef.get<ORMService>(ORMService);
    userService = moduleRef.get<UserService>(UserService);
    audienceService = moduleRef.get<AudienceService>(AudienceService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Delete a user object', () => {
    describe('When deleteUserByUserId is called in user service', () => {
      test('Then it must return the deleted user in orm', async () => {
        ormService.user.delete = jest.fn().mockResolvedValue(userStub());
        ormService.user.findMany = jest.fn().mockResolvedValue(userStub());
        const { data } = await userService.deleteUserByUserId(userDtoStub());
        expect(data).toMatchObject(userGetOrDeleteStub());
      });

      test('If it does not find the user it throws a NotFoundException', async () => {
        ormService.user.delete = jest.fn().mockImplementation(() => {
          throw new NotFoundError('');
        });
        const promise = userService.deleteUserByUserId(userDtoStub());
        await expect(promise).rejects.toThrow(NotFoundException);
      });

      test('If delete throws an error related with a db constraint it throws a UnprocessableEntityException', async () => {
        ormService.user.delete = jest.fn().mockResolvedValue(userDtoStub());
        ormService.user.delete = jest.fn().mockImplementation(() => {
          throw new PrismaClientKnownRequestError(
            '',
            PRISMA.ERRORS.FOREIGN_KEY_CONSTRAINT,
            '',
          );
        });
        const promise = userService.deleteUserByUserId(userDtoStub());
        await expect(promise).rejects.toThrow(BadRequestException);
      });

      test('It must throw back any other error', async () => {
        ormService.user.delete = jest.fn().mockResolvedValue(userDtoStub());
        ormService.user.delete = jest.fn().mockImplementation(() => {
          throw new Error('');
        });
        const promise = userService.deleteUserByUserId(userDtoStub());
        await expect(promise).rejects.toThrow(Error);
      });
    });
  });

  describe('Get user by user id', () => {
    test('Then it must return the found user in orm', async () => {
      ormService.user.findFirst = jest.fn().mockResolvedValue(userStub());
      const { data } = await userService.getUserById(userDtoStub());
      expect(data).toMatchObject(userStub());
    });

    test('Then if the user is not found the service must throw NotFoundException', async () => {
      ormService.user.findFirst = jest.fn().mockImplementation(() => {
        throw new NotFoundError('');
      });
      const promise = userService.getUserById(userDtoStub());
      await expect(promise).rejects.toThrow(NotFoundException);
    });

    test('If get throws an error related with a db constraint it throws a UnprocessableEntityException', async () => {
      ormService.user.findFirst = jest.fn().mockImplementation(() => {
        throw new PrismaClientKnownRequestError(
          '',
          PRISMA.ERRORS.FOREIGN_KEY_CONSTRAINT,
          '',
        );
      });
      const promise = userService.getUserById(userDtoStub());
      await expect(promise).rejects.toThrow(BadRequestException);
    });

    test('Then it must throw back any other error', async () => {
      ormService.user.findFirst = jest.fn().mockImplementation(() => {
        throw new Error('');
      });
      const promise = userService.getUserById(userDtoStub());
      expect(promise).rejects.toThrow(Error);
    });
  });
});
