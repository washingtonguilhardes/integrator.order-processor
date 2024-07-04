import { UserEntry } from '@src/core/users/domains';
import { DatabaseUserRepository } from './database-user.impl';

describe('DatabaseUserRepository', () => {
  let repository: DatabaseUserRepository;
  let orderRepositoryMock: jest.Mocked<{ upsert: jest.Mock }>;

  beforeEach(() => {
    orderRepositoryMock = {
      upsert: jest.fn(),
    };
    repository = new DatabaseUserRepository(orderRepositoryMock as any);
  });

  describe('save', () => {
    it('should save a user entry', async () => {
      const userId = 1;
      const user: UserEntry = { user_id: userId, user_name: 'John Doe' };

      const result = await repository.save(user);

      expect(result).toEqual(userId);
      expect(orderRepositoryMock.upsert).toHaveBeenCalledWith({
        create: { user_id: user.user_id, name: user.user_name },
        update: { name: user.user_name },
        where: { user_id: user.user_id },
      });
    });
  });
});
