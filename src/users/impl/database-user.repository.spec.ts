import { DatabaseUserRepository } from './database-user.repository';

describe('DatabaseUserRepository', () => {
  let repository: DatabaseUserRepository;
  let orderRepositoryMock: jest.Mocked<any>;

  beforeEach(() => {
    orderRepositoryMock = {
      findFirstOrThrow: jest.fn(),
      findMany: jest.fn(),
      upsert: jest.fn(),
      update: jest.fn(),
    } as any;
    repository = new DatabaseUserRepository(orderRepositoryMock);
  });

  describe('getById', () => {
    it('should return a user entry by id', async () => {
      const userId = 1;
      const user = { user_id: userId, name: 'John Doe' };
      orderRepositoryMock.findFirstOrThrow.mockResolvedValue(user);

      const result = await repository.getById(userId);

      expect(result).toEqual({ user_id: userId, user_name: 'John Doe' });
      expect(orderRepositoryMock.findFirstOrThrow).toHaveBeenCalledWith({
        where: { user_id: userId },
      });
    });
  });

  describe('getAll', () => {
    it('should return all user entries', async () => {
      const users = [
        { user_id: 1, name: 'John Doe' },
        { user_id: 2, name: 'Jane Smith' },
      ];
      orderRepositoryMock.findMany.mockResolvedValue(users);

      const result = await repository.getAll();

      expect(result).toEqual([
        { user_id: 1, user_name: 'John Doe' },
        { user_id: 2, user_name: 'Jane Smith' },
      ]);
      expect(orderRepositoryMock.findMany).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new user entry', async () => {
      const userEntry = { user_id: 1, user_name: 'John Doe' };

      await repository.create(userEntry);

      expect(orderRepositoryMock.upsert).toHaveBeenCalledWith({
        create: { user_id: 1, name: 'John Doe' },
        update: { name: 'John Doe' },
        where: { user_id: 1 },
      });
    });
  });

  describe('update', () => {
    it('should update a user entry', async () => {
      orderRepositoryMock.findFirstOrThrow.mockResolvedValue({
        user_id: 1,
        name: 'John Doe',
      });

      await repository.update({ user_id: 1, user_name: 'Jane Smith' });

      expect(orderRepositoryMock.update).toHaveBeenCalledWith({
        where: { user_id: 1 },
        data: { user_id: 1, user_name: 'Jane Smith' },
      });
    });
  });
});
