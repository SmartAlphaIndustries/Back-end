import { Acceptance } from "@prisma/client";
import { CreateAcceptanceDto, UpdateAcceptanceDto } from "../dto";

export const acceptancePayload = (): Acceptance => ({
  id: '6357ce11fb82be0bc5066019',
  createdAt: new Date(),
  updatedAt: new Date(),
  title: 'El principito',
  template: 'Es un cuento infantil...',
  version: 'v1'
});

export const acceptanceStub = (): CreateAcceptanceDto | UpdateAcceptanceDto => ({
  title: 'El principito',
  template: 'Es un cuento infantil...',
  version: 'v1'
});

export const acceptanceDeleteStub = () => ({
  title: 'El principito',
  template: 'Es un cuento infantil...',
  version: 'v1'
});
