import {
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ORMService } from '../orm/orm.service';
import { mockDeep } from 'jest-mock-extended';
import {
  NotFoundError,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime';
import { PRISMA } from '../commons/prisma.constants';
import { AcceptanceService } from './acceptance.service';
import { Acceptance } from '@prisma/client';
import { CreateAcceptanceDto, UpdateAcceptanceDto } from './dto';
import { acceptanceDeleteStub, acceptancePayload, acceptanceStub } from './__mocks__/acceptance';

describe('Acceptance Service', () => {
  let ormService: ORMService;
  let acceptanceService: AcceptanceService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AcceptanceService,
        {
          provide: ORMService,
          useValue: mockDeep<ORMService>(),
        },
      ],
    }).compile();

    ormService = moduleRef.get<ORMService>(ORMService);
    acceptanceService = moduleRef.get<AcceptanceService>(AcceptanceService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Create an acceptance object', () => {
    describe('When createAcceptance is called in acceptance service', () => {
      let response: Acceptance;
      let createAcceptanceDto: CreateAcceptanceDto;

      beforeAll(async () => {
        createAcceptanceDto = {
          title: acceptanceStub().title,
          template: acceptanceStub().template,
          version: acceptanceStub().version,
        };
        const { data } = await acceptanceService.createAcceptance(
          createAcceptanceDto,
        );
        response = data;
      });

      test('It must return the created acceptance object', async () => {
        ormService.acceptance.create = jest
          .fn()
          .mockResolvedValue(acceptanceStub());
        const { data } = await acceptanceService.createAcceptance(
          acceptanceStub(),
        );
        expect(data).toMatchObject(acceptanceStub());
      });

      test('Then it must call create method in orm', async () => {
        ormService.acceptance.create = jest
          .fn()
          .mockResolvedValue(acceptanceStub());
        const { data } = await acceptanceService.createAcceptance(
          acceptanceStub(),
        );
        expect(ormService.acceptance.create).toHaveBeenCalledTimes(1);
        expect(ormService.acceptance.create).toHaveBeenCalledWith({
          data: createAcceptanceDto,
        });
      });

      test('If it does not find acceptance it throws a NotFoundException', async () => {
        ormService.acceptance.create = jest.fn().mockImplementation(() => {
          throw new NotFoundError('');
        });
        const promise = acceptanceService.createAcceptance(acceptanceStub());
        await expect(promise).rejects.toThrow(NotFoundException);
      });

      test('If create  throws an error related with a db constraint it throws a UnprocessableEntityException', async () => {
        ormService.acceptance.findUniqueOrThrow = jest
          .fn()
          .mockResolvedValue(acceptanceStub());
        ormService.acceptance.create = jest.fn().mockImplementation(() => {
          throw new PrismaClientKnownRequestError(
            '',
            PRISMA.ERRORS.FOREIGN_KEY_CONSTRAINT,
            '',
          );
        });
        const promise = acceptanceService.createAcceptance(acceptanceStub());
        await expect(promise).rejects.toThrow(BadRequestException);
      });

      test('It must throw back any other error', async () => {
        ormService.acceptance.findUniqueOrThrow = jest
          .fn()
          .mockResolvedValue(acceptanceStub());
        ormService.acceptance.create = jest.fn().mockImplementation(() => {
          throw new Error('');
        });
        const promise = acceptanceService.createAcceptance(acceptanceStub());
        await expect(promise).rejects.toThrow(Error);
      });
    });
  });

  describe('Delete an acceptance object', () => {
    describe('When deleteAcceptance is called in acceptance service', () => {
      const acceptanceId: string = acceptancePayload().id;

      test('Then it must call acceptance.delete in orm', async () => {
        ormService.acceptance.delete = jest
          .fn()
          .mockResolvedValue(acceptanceId);

        const { data } = await acceptanceService.deleteAcceptance(acceptanceId);
        expect(ormService.acceptance.delete).toHaveBeenCalledTimes(1);
      });

      test('Then it must return the deleted acceptance object', async () => {
        ormService.acceptance.delete = jest
          .fn()
          .mockResolvedValue(acceptanceDeleteStub());

        const { data } = await acceptanceService.deleteAcceptance(acceptanceId);
        expect(data).toMatchObject(acceptanceDeleteStub());
      });

      test('Then delete must throw back any other error', async () => {
        ormService.acceptance.delete = jest.fn().mockImplementation(() => {
          throw new Error('');
        });
        const promise = acceptanceService.deleteAcceptance(acceptanceId);
        await expect(promise).rejects.toThrow(Error);
      });
    });
  });

  describe('Get acceptance by its id', () => {
    const acceptanceId: string = acceptancePayload().id;

    test('Then it must return the found acceptance', async () => {
      ormService.acceptance.findUniqueOrThrow = jest
        .fn()
        .mockResolvedValue(acceptanceStub());
      const { data } = await acceptanceService.getAcceptanceById(acceptanceId);
      expect(data).toMatchObject(acceptanceStub());
    });

    test('Then if the acceptance is not found the service must throw NotFoundException', async () => {
      ormService.acceptance.findUniqueOrThrow = jest
        .fn()
        .mockImplementation(() => {
          throw new NotFoundError('');
        });
      const promise = acceptanceService.getAcceptanceById(acceptanceId);
      await expect(promise).rejects.toThrow(NotFoundException);
    });

    test('Then it must throw back any other error', async () => {
      ormService.acceptance.findUniqueOrThrow = jest
        .fn()
        .mockImplementation(() => {
          throw new Error('');
        });
      const promise = acceptanceService.getAcceptanceById(acceptanceId);
      expect(promise).rejects.toThrow(Error);
    });
  });

  describe('Update an acceptance', () => {
    describe('When updateAcceptance is called in acceptance service', () => {
      let response: Acceptance;
      let updateAcceptanceDto: UpdateAcceptanceDto;

      beforeEach(async () => {
        updateAcceptanceDto = {
          title: acceptanceStub().title,
          template: acceptanceStub().template,
          version: acceptanceStub().version,
        };
      });

      test('Then it must have called acceptance.update in orm', async () => {
        ormService.acceptance.update = jest
          .fn()
          .mockResolvedValue(acceptanceStub());
        await acceptanceService.updateAcceptance(
          updateAcceptanceDto,
          acceptancePayload().id,
        );
        expect(ormService.acceptance.update).toHaveBeenCalledTimes(1);
      });

      test('Then it must return the updated acceptance', async () => {
        ormService.acceptance.update = jest
          .fn()
          .mockResolvedValue(acceptanceStub());
        const { data } = await acceptanceService.updateAcceptance(
          updateAcceptanceDto,
          acceptancePayload().id,
        );
        response = data;
        expect(response).toMatchObject(acceptanceStub());
      });

      test('Then if acceptance.update does not find record then will throw NotFound exception', async () => {
        ormService.acceptance.update = jest.fn().mockImplementation(() => {
          throw new PrismaClientKnownRequestError(
            '',
            PRISMA.ERRORS.REQUIRED_RECORDS_NOTFOUND,
            '',
          );
        });
        let error = null;
        try {
          await acceptanceService.updateAcceptance(
            updateAcceptanceDto,
            acceptancePayload().id,
          );
        } catch (err) {
          error = err;
        }
        expect(error).toBeInstanceOf(NotFoundException);
      });

      test('Then if acceptance.update encounters a db constraint it throws a unprocessable exception', async () => {
        ormService.acceptance.update = jest.fn().mockImplementation(() => {
          throw new PrismaClientKnownRequestError(
            '',
            PRISMA.ERRORS.DB_CONSTRAINT,
            '',
          );
        });
        let error = null;
        try {
          await acceptanceService.updateAcceptance(
            updateAcceptanceDto,
            acceptancePayload().id,
          );
        } catch (err) {
          error = err;
        }
        expect(error).toBeInstanceOf(UnprocessableEntityException);
      });

      test('Then it throws back any other error', async () => {
        ormService.acceptance.update = jest.fn().mockImplementation(() => {
          throw new Error('Error message');
        });
        let error: any = null;
        try {
          await acceptanceService.updateAcceptance(
            updateAcceptanceDto,
            acceptancePayload().id,
          );
        } catch (err) {
          error = err;
        }
        expect(error instanceof NotFoundException).toBe(false);
        expect(error instanceof UnprocessableEntityException).toBe(false);
        expect(error.message).toBe('Error message');
      });
    });
  });
});
