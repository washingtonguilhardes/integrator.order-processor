import { PushUserEntryToStore } from '../domains';
import { UserEntryBulkUpsertUseCase } from './user-entry-bulk-upsert.usecase';

describe('UserEntryBulkUpsertUseCase', () => {
  let useCase: UserEntryBulkUpsertUseCase;
  let pushUserEntryToStoreMock: jest.Mocked<PushUserEntryToStore>;

  beforeEach(() => {
    pushUserEntryToStoreMock = { execute: jest.fn() };
    useCase = new UserEntryBulkUpsertUseCase(pushUserEntryToStoreMock);
  });

  it('should push user entries to store and return a set of user IDs', async () => {
    const users = [
      { user_id: 1, user_name: 'Jane 1' },
      { user_id: 2, user_name: 'Jane 2' },
      { user_id: 3, user_name: 'Jane 5' },
    ];

    const result = await useCase.execute(users[Symbol.iterator]());

    expect(pushUserEntryToStoreMock.execute).toHaveBeenCalledTimes(3);
    expect(pushUserEntryToStoreMock.execute).toHaveBeenNthCalledWith(1, users[0]);
    expect(pushUserEntryToStoreMock.execute).toHaveBeenNthCalledWith(2, users[1]);
    expect(pushUserEntryToStoreMock.execute).toHaveBeenNthCalledWith(3, users[2]);
    expect(result).toEqual(new Set([1, 2, 3]));
  });
});
