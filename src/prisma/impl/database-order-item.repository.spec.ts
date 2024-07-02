import { DatabaseOrderItemRepository } from './database-order-item.repository';

describe('DatabaseOrderItemRepository', () => {
  let repository: DatabaseOrderItemRepository;
  let orderItemRepoMock: jest.Mocked<{ upsert: jest.Mock; findMany: jest.Mock }>;

  beforeAll(async () => {
    orderItemRepoMock = { upsert: jest.fn(), findMany: jest.fn() };
    repository = new DatabaseOrderItemRepository(orderItemRepoMock as any);
  });

  describe('save', () => {
    it('should save the order item', async () => {
      const orderItem = {
        legacy_product_id: '123',
        value: 10,
        order_id: 1,
        product_id: 1,
      };

      await repository.save(orderItem);
      expect(orderItemRepoMock.upsert).toHaveBeenCalledWith({
        create: {
          value: orderItem.value,
          order_id: orderItem.order_id,
          legacy_product_id: orderItem.legacy_product_id,
          product_id: orderItem.product_id,
        },
        update: {
          value: orderItem.value,
          legacy_product_id: orderItem.legacy_product_id,
        },
        where: {
          order_id: orderItem.order_id,
          legacy_product_id: orderItem.legacy_product_id,
          value: orderItem.value,
          product_id: orderItem.product_id,
        },
      });
    });
  });

  describe('getByOrderId', () => {
    it('should return order items by order ID', async () => {
      const result = [
        {
          id: 1,
          value: 10,
          order_id: 1,
          product_id: 1,
          legacy_product_id: '123',
        },
      ];
      orderItemRepoMock.findMany.mockResolvedValue(result);
      const orderId = 1;

      const orderItems = await repository.getByOrderId(orderId);

      expect(orderItems).toBeDefined();
      expect(orderItems.length).toBeGreaterThan(0);
      expect(orderItems).toEqual(result);
    });
  });
});
