import * as dayjs from 'dayjs';
import { DatabaseUserWithOrdersRepositoryImpl } from './database-user-with-orders.impl';

describe('UserWithOrdersRepositoryImpl', () => {
  let repository: DatabaseUserWithOrdersRepositoryImpl;
  let userRepository: jest.Mocked<any>;
  let orderRepository: jest.Mocked<any>;

  beforeEach(async () => {
    userRepository = {
      findMany: jest.fn(),
      count: jest.fn(),
    } as any;
    orderRepository = {
      findMany: jest.fn(),
    } as any;

    repository = new DatabaseUserWithOrdersRepositoryImpl(
      userRepository,
      orderRepository,
    );
  });

  describe('getAll', () => {
    it('should return paginated response of users with orders', async () => {
      const filter = {
        orderId: 1,
        interval: { start: '2021-01-01', end: '2021-01-02' },
      };

      const users = [
        { name: 'name 1', user_id: 1 },
        { name: 'name 2', user_id: 2 },
      ];
      const orders = [
        {
          order_id: 1,
          user_id: 1,
          total: 0,
          date: dayjs('2021-01-01').toDate(),
          products: [],
        },
        {
          order_id: 2,
          user_id: 1,
          total: 0,
          date: dayjs('2021-01-01').toDate(),
          products: [],
        },
        {
          order_id: 3,
          user_id: 2,
          total: 0,
          date: dayjs('2021-01-01').toDate(),
          products: [],
        },
      ];

      userRepository.findMany.mockResolvedValue(users);
      orderRepository.findMany.mockResolvedValue(orders);

      const result = await repository.getAll(filter);

      expect(userRepository.findMany).toHaveBeenCalled();
      expect(orderRepository.findMany).toHaveBeenCalledWith({
        where: {
          user_id: { in: [1, 2] },
          order_id: { in: [1] },
          date: {
            lte: dayjs('2021-01-01').toISOString(),
            gte: dayjs('2021-01-02').toISOString(),
          },
        },
        include: { products: true },
      });
      expect(result.entries).toEqual(
        users.map(u => ({
          ...u,
          orders: orders.filter(o => o.user_id === u.user_id),
        })),
      );
      expect(result.total).toBe(2);
      expect(result.pageSize).toBe(2);
    });

    it('should return paginated response of users without orders', async () => {
      const filter = {
        orderId: null,
        interval: { start: undefined, end: undefined },
      };

      const users = [
        { name: 'name 1', user_id: 1 },
        { name: 'name 2', user_id: 2 },
      ];
      const orders = [];

      userRepository.findMany.mockResolvedValue(users);
      orderRepository.findMany.mockResolvedValue(orders);

      const result = await repository.getAll(filter);

      expect(userRepository.findMany).toHaveBeenCalled();
      expect(orderRepository.findMany).toHaveBeenCalledWith({
        where: {
          date: {},
          user_id: { in: [1, 2] },
        },
        include: { products: true },
      });
      expect(result.entries).toEqual([]);
      expect(result.total).toBe(0);
      expect(result.pageSize).toBe(0);
    });
  });

  describe('count', () => {
    it('should return the count of users', async () => {
      const count = 10;
      userRepository.count.mockResolvedValue(count);

      const result = await repository.count();

      expect(userRepository.count).toHaveBeenCalled();
      expect(result).toBe(count);
    });
  });
});
