import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ORMService } from '../orm/orm.service';
import { mockDeep } from 'jest-mock-extended';
import {
  NotFoundError,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime';
import { PRISMA } from '../commons/prisma.constants';
import { AudienceService } from './audience.service';
import {
  addOrDeleteResponseStub,
  addOrDeleteUserStub,
  audienceStub,
  deleteAudienceStub,
} from './__mocks__/audience';

describe('Audience Service', () => {
  let ormService: ORMService;
  let audienceService: AudienceService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AudienceService,
        {
          provide: ORMService,
          useValue: mockDeep<ORMService>(),
        },
      ],
    }).compile();

    ormService = moduleRef.get<ORMService>(ORMService);
    audienceService = moduleRef.get<AudienceService>(AudienceService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Create an audience object', () => {
    describe('When createAudience is called in audience service', () => {
      test('It must return the created audience object', async () => {
        ormService.audience.create = jest
          .fn()
          .mockResolvedValue(audienceStub());
        const { data } = await audienceService.createAudience(audienceStub());
        expect(data).toMatchObject(audienceStub());
      });

      test('Then it must call create method in orm', async () => {
        ormService.audience.create = jest
          .fn()
          .mockResolvedValue(audienceStub());
        await audienceService.createAudience(audienceStub());
        expect(ormService.audience.create).toHaveBeenCalledTimes(1);
      });

      test('If create throws an error related with a db constraint it throws a UnprocessableEntityException', async () => {
        ormService.audience.create = jest
          .fn()
          .mockResolvedValue(audienceStub());
        ormService.audience.create = jest.fn().mockImplementation(() => {
          throw new PrismaClientKnownRequestError(
            '',
            PRISMA.ERRORS.FOREIGN_KEY_CONSTRAINT,
            '',
          );
        });
        const promise = audienceService.createAudience(audienceStub());
        await expect(promise).rejects.toThrow(BadRequestException);
      });

      test('It must throw back any other error', async () => {
        ormService.audience.create = jest
          .fn()
          .mockResolvedValue(audienceStub());
        ormService.audience.create = jest.fn().mockImplementation(() => {
          throw new Error('');
        });
        const promise = audienceService.createAudience(audienceStub());
        await expect(promise).rejects.toThrow(Error);
      });
    });
  });

  describe('Add a user in an audience group', () => {
    test('Then it must return the new group with the added user', async () => {
      ormService.audience.findFirst = jest
        .fn()
        .mockResolvedValue(addOrDeleteResponseStub());
      const { data } = await audienceService.addUser(addOrDeleteUserStub());
      expect(data).toMatchObject(addOrDeleteResponseStub());
    });

    test('Then if the audience is not found the service must throw NotFoundException', async () => {
      ormService.audience.findFirst = jest.fn().mockImplementation(() => {
        throw new NotFoundError('');
      });
      const promise = audienceService.addUser(addOrDeleteUserStub());
      await expect(promise).rejects.toThrow(NotFoundException);
    });

    test('If addUser throws an error related with a db constraint it throws a UnprocessableEntityException', async () => {
      ormService.audience.findFirst = jest
        .fn()
        .mockResolvedValue(addOrDeleteResponseStub());
      ormService.audience.update = jest.fn().mockImplementation(() => {
        throw new PrismaClientKnownRequestError(
          '',
          PRISMA.ERRORS.FOREIGN_KEY_CONSTRAINT,
          '',
        );
      });
      const promise = audienceService.addUser(addOrDeleteUserStub());
      await expect(promise).rejects.toThrow(BadRequestException);
    });

    test('Then it must throw back any other error', async () => {
      ormService.audience.findFirst = jest.fn().mockImplementation(() => {
        throw new Error('');
      });
      const promise = audienceService.addUser(addOrDeleteUserStub());
      expect(promise).rejects.toThrow(Error);
    });
  });

  describe('Delete an audience', () => {
    test('Then it must return the deleted audience id', async () => {
      ormService.audience.delete = jest
        .fn()
        .mockResolvedValue(deleteAudienceStub());
      const { data } = await audienceService.deleteAudience(
        deleteAudienceStub(),
      );
      expect(data).toMatchObject(deleteAudienceStub());
    });

    test('Then if the audience is not found the service must throw NotFoundException', async () => {
      ormService.audience.delete = jest.fn().mockImplementation(() => {
        throw new NotFoundError('');
      });
      const promise = audienceService.deleteAudience(addOrDeleteUserStub());
      await expect(promise).rejects.toThrow(NotFoundException);
    });

    test('If create  throws an error related with a db constraint it throws a UnprocessableEntityException', async () => {
      ormService.audience.delete = jest.fn().mockImplementation(() => {
        throw new PrismaClientKnownRequestError(
          '',
          PRISMA.ERRORS.FOREIGN_KEY_CONSTRAINT,
          '',
        );
      });
      const promise = audienceService.deleteAudience(addOrDeleteUserStub());
      await expect(promise).rejects.toThrow(BadRequestException);
    });

    test('Then it must throw back any other error', async () => {
      ormService.audience.delete = jest.fn().mockImplementation(() => {
        throw new Error('');
      });
      const promise = audienceService.deleteAudience(addOrDeleteUserStub());
      expect(promise).rejects.toThrow(Error);
    });
  });

  describe('Delete a user from an audience group', () => {
    test('Then it must return the audience without the deleted user', async () => {
      const newArray = addOrDeleteResponseStub();
      ormService.audience.findFirst = jest
        .fn()
        .mockResolvedValue((addOrDeleteUserStub().userId, newArray));
      ormService.audience.update = jest
        .fn()
        .mockResolvedValue(addOrDeleteResponseStub());
      const { data } = await audienceService.deleteUser(addOrDeleteUserStub());
      expect(data).toMatchObject(addOrDeleteResponseStub());
    });

    test('Then if the audience is not found the service must throw NotFoundException', async () => {
      ormService.audience.findFirst = jest.fn().mockImplementation(() => {
        throw new NotFoundError('');
      });
      const promise = audienceService.deleteUser(addOrDeleteUserStub());
      await expect(promise).rejects.toThrow(NotFoundException);
    });

    test('If create throws an error related with a db constraint it throws a UnprocessableEntityException', async () => {
      ormService.audience.findFirst = jest
        .fn()
        .mockResolvedValue(addOrDeleteResponseStub());
      ormService.audience.update = jest.fn().mockImplementation(() => {
        throw new PrismaClientKnownRequestError(
          '',
          PRISMA.ERRORS.FOREIGN_KEY_CONSTRAINT,
          '',
        );
      });
      const promise = audienceService.deleteUser(addOrDeleteUserStub());
      await expect(promise).rejects.toThrow(BadRequestException);
    });

    test('Then it must throw back any other error', async () => {
      ormService.audience.findFirst = jest.fn().mockImplementation(() => {
        throw new Error('');
      });
      const promise = audienceService.deleteUser(addOrDeleteUserStub());
      expect(promise).rejects.toThrow(Error);
    });
  });
});
