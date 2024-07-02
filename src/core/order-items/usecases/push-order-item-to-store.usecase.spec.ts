import { OrderItemEntry, PushOrderItemEntryToStore } from '../domains';
import { OrderItemRepository } from '../repositories';
import { PushOrderItemToStoreUsecase } from './push-order-item-to-store.usecase';

describe('PushOrderItemToStoreUsecase', () => {
  let usecase: PushOrderItemEntryToStore;
  let repository: jest.Mocked<OrderItemRepository>;

  beforeEach(() => {
    repository = { save: jest.fn().mockReturnValue(1) } as any;
    usecase = new PushOrderItemToStoreUsecase(repository);
  });

  it('should save the order item and return the product ID', async () => {
    const orderItem: OrderItemEntry = { product_id: 1, value: 100, order_id: 1 };
    const saveSpy = jest.spyOn(repository, 'save');

    const result = await usecase.execute(orderItem);

    expect(saveSpy).toHaveBeenCalledWith(orderItem);
    expect(result).toBe(orderItem.product_id);
  });
});
