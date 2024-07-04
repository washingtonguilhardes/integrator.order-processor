import { DatabaseOrderItemRepositoryImpl } from './database-order-item.impl';

describe('DatabaseOrderItemRepository', () => {
  let repository: DatabaseOrderItemRepositoryImpl;
  let orderItemRepoMock: jest.Mocked<{
    create: jest.Mock;
    findMany: jest.Mock;
    findFirst: jest.Mock;
  }>;

  beforeAll(async () => {
    orderItemRepoMock = { create: jest.fn(), findMany: jest.fn(), findFirst: jest.fn() };
    repository = new DatabaseOrderItemRepositoryImpl(orderItemRepoMock as any);
  });

  describe('save', () => {
    it('should save the order item when it isnt duplicated on db', async () => {
      const orderItem = {
        value: 10,
        order_id: 1,
        product_id: 1,
      };

      orderItemRepoMock.findFirst.mockResolvedValue(null);

      await repository.save(orderItem);
      expect(orderItemRepoMock.create).toHaveBeenCalledWith({
        data: {
          value: orderItem.value,
          order_id: orderItem.order_id,
          product_id: orderItem.product_id,
          status: 'DONE',
          comments: '',
        },
      });
    });
    it('should save order item with comments when it is duplicated', async () => {
      const orderItem = {
        value: 10,
        order_id: 1,
        product_id: 1,
      };

      orderItemRepoMock.findFirst.mockResolvedValue({ order_id: 1, product_id: 12 });

      await repository.save(orderItem);
      expect(orderItemRepoMock.create).toHaveBeenCalledWith({
        data: {
          value: orderItem.value,
          order_id: orderItem.order_id,
          product_id: orderItem.product_id,
          status: 'NEED_ATTENTION',
          comments: `Order item already exists with product_id: 12 in order_id: ${1}`,
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
