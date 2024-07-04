import { UserRepository } from '../repositories';
import { PushUserEntryToStoreUseCase } from './push-user-entry-to-store.usecase';

describe('PushUserEntryToStoreUseCase', () => {
  let useCase: PushUserEntryToStoreUseCase;
  let userRepoMock: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepoMock = { save: jest.fn() } as any;
    useCase = new PushUserEntryToStoreUseCase(userRepoMock);
  });

  it('should create a user entry and return the user ID', async () => {
    const entry = { user_id: 1, user_name: 'Jane' };

    userRepoMock.save.mockResolvedValue(entry.user_id);

    const result = await useCase.execute(entry);

    expect(userRepoMock.save).toHaveBeenCalledTimes(1);
    expect(userRepoMock.save).toHaveBeenCalledWith(entry);
    expect(result).toBe(entry.user_id);
  });
});
