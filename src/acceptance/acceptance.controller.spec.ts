import { Test } from '@nestjs/testing';
import { Acceptance } from '@prisma/client';
import { AuthzModule } from '../authz/authz.module';
import { mockDeep } from 'jest-mock-extended';
import { AcceptanceService } from './acceptance.service';
import { AcceptanceController } from './acceptance.controller';
import { acceptancePayload, acceptanceStub } from './__mocks__/acceptance';
import { UpdateAcceptanceDto } from './dto';

describe('AcceptanceController', () => {
  let acceptanceService: AcceptanceService;
  let acceptanceController: AcceptanceController;
  const acceptanceId: string = acceptancePayload().id;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthzModule],
      providers: [
        {
          provide: AcceptanceService,
          useValue: mockDeep<AcceptanceService>(),
        },
      ],
      controllers: [AcceptanceController],
    }).compile();

    acceptanceController =
      moduleRef.get<AcceptanceController>(AcceptanceController);
    acceptanceService = moduleRef.get<AcceptanceService>(AcceptanceService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Create Acceptance', () => {
    describe('when createAcceptance is called in acceptance controller', () => {
      test('Then createAcceptance is called in acceptance service', async () => {
        await acceptanceController.createAcceptance(acceptanceStub());
        expect(acceptanceService.createAcceptance).toHaveBeenCalledWith(
          acceptanceStub(),
        );
      });

      test('Then it must return the acceptance object that was created', async () => {
        acceptanceService.createAcceptance = jest
          .fn()
          .mockResolvedValue({ data: acceptanceStub() });
        const { data } = await acceptanceController.createAcceptance(
          acceptanceStub(),
        );
        expect(data).toMatchObject(acceptanceStub());
      });
    });
  });

  describe('Delete an acceptance object', () => {
    describe('When deleteAcceptance is called in acceptance Controller', () => {
      test('Then it must have called deleteAcceptance in acceptance Service', async () => {
        await acceptanceController.deleteAcceptance(acceptanceId);
        expect(acceptanceService.deleteAcceptance).toHaveBeenCalledWith(
          acceptanceId,
        );
      });

      test('Then it must return the deleted acceptance object', async () => {
        acceptanceService.deleteAcceptance = jest.fn().mockResolvedValue({
          data: acceptanceStub(),
        });
        const { data } = await acceptanceController.deleteAcceptance(
          acceptanceId,
        );
        expect(data).toMatchObject(acceptanceStub());
      });
    });
  });

  describe('Get an acceptance by its id', () => {
    test('It must call getAcceptanceById in service', async () => {
      await acceptanceController.getAcceptanceById(acceptanceId);
      expect(acceptanceService.getAcceptanceById).toHaveBeenCalledWith(
        acceptanceId,
      );
    });
    test('It must return the found acceptance', async () => {
      acceptanceService.getAcceptanceById = jest.fn().mockResolvedValue({
        data: acceptanceStub(),
      });
      const { data } = await acceptanceController.getAcceptanceById(
        acceptanceId,
      );
      expect(data).toMatchObject(acceptanceStub());
    });
  });

  describe('Update an acceptance', () => {
    describe('When updateAcceptance is called in acceptance controller', () => {
      let returnedAcceptance: Acceptance;
      let updateAcceptanceDto: UpdateAcceptanceDto;

      beforeEach(async () => {
        updateAcceptanceDto = {
          title: acceptanceStub().title,
          template: acceptanceStub().template,
          version: acceptanceStub().version,
        };
        acceptanceService.updateAcceptance = jest.fn().mockResolvedValue({
          data: acceptanceStub(),
        });
        const { data } = await acceptanceController.updateAcceptance(
          acceptancePayload().id,
          updateAcceptanceDto,
        );
        returnedAcceptance = data;
      });

      test('Then it must call updateAcceptance in the acceptance controller', async () => {
        expect(acceptanceService.updateAcceptance).toHaveBeenCalledWith(
          updateAcceptanceDto,
          acceptancePayload().id,
        );
      });

      test('Then it must return the updated object', async () => {
        acceptanceService.deleteAcceptance = jest.fn().mockResolvedValue({
          data: acceptanceStub(),
        });
        const { data } = await acceptanceController.updateAcceptance(
          acceptancePayload().id,
          updateAcceptanceDto,
        );
        expect(data).toMatchObject(acceptanceStub());
      });
    });
  });
});
