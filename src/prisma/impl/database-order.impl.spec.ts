import { DatabaseOrderRepositoryImpl } from './database-order.impl';

describe('DatabaseOrderRepository', () => {
  let repository: DatabaseOrderRepositoryImpl;
  let orderRepo: jest.Mocked<{ upsert: jest.Func }>;

  beforeEach(async () => {
    orderRepo = { upsert: jest.fn() };
    repository = new DatabaseOrderRepositoryImpl(orderRepo as any);
  });

  describe('save', () => {
    it('should save the order entry', async () => {
      const orderEntry = {
        order_id: 1,
        order_date: new Date(),
        total: 100,
        user_id: 1,
      };

      await repository.save(orderEntry);

      expect(orderRepo.upsert).toHaveBeenCalledWith({
        create: {
          order_id: orderEntry.order_id,
          date: orderEntry.order_date,
          total: orderEntry.total,
          user_id: orderEntry.user_id,
        },
        update: {
          date: orderEntry.order_date,
          total: orderEntry.total,
        },
        where: {
          order_id: orderEntry.order_id,
        },
      });
    });
  });

  // Add more test cases for other methods
});
