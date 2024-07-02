import { UserRepository } from '../repositories';
import { PushUserEntryToStoreUseCase } from './push-user-entry-to-store.usecase';

describe('PushUserEntryToStoreUseCase', () => {
  let useCase: PushUserEntryToStoreUseCase;
  let userRepoMock: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepoMock = { create: jest.fn() } as any;
    useCase = new PushUserEntryToStoreUseCase(userRepoMock);
  });

  it('should create a user entry and return the user ID', async () => {
    const entry = { user_id: 1, user_name: 'Jane' };
    const userId = 123;

    userRepoMock.create.mockResolvedValue(userId);

    const result = await useCase.execute(entry);

    expect(userRepoMock.create).toHaveBeenCalledTimes(1);
    expect(userRepoMock.create).toHaveBeenCalledWith(entry);
    expect(result).toBe(userId);
  });
});
