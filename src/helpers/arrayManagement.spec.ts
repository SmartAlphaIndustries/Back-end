import { deleteElement, deleteUsersFromAudiences } from './arrayManagement';

describe('deleteElement', () => {
  test('deletes an element from an array', () => {
    const array = ['item1', 'item2', 'item3'];
    const element = 'item2';
    const expectedArray = ['item1', 'item3'];
    expect(deleteElement(element, array)).toEqual(expectedArray);
  });
});

describe('deleteUsersFromAudiences', () => {
  test('calls deleteUser for each element in the array', () => {
    const audienceIdsArray = [{ id: '1' }, { id: '2' }, { id: '3' }];
    const dto = { userId: 'user1' };
    const audienceService = {
      deleteUser: jest.fn(),
    };
    deleteUsersFromAudiences(audienceIdsArray, dto, audienceService);
    expect(audienceService.deleteUser).toBeCalled();
  });
});
