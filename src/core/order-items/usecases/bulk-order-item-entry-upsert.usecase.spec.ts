import { OrderItemEntry, PushOrderItemEntryToStore } from '../domains';
import { BulkOrderItemEntryUpsertUseCase } from './bulk-order-item-entry-upsert.usecase';

describe('BulkOrderItemEntryUpsertUseCase', () => {
  let usecase: BulkOrderItemEntryUpsertUseCase;
  let pushOrderEntryToStore: jest.Mocked<PushOrderItemEntryToStore>;

  beforeEach(() => {
    pushOrderEntryToStore = { execute: jest.fn() } as any;
    usecase = new BulkOrderItemEntryUpsertUseCase(pushOrderEntryToStore);
  });

  it('should execute pushOrderEntryToStore for each order entry and return the product IDs', async () => {
    const orderEntries: OrderItemEntry[] = [
      { product_id: 1, value: 100, order_id: 11, legacy_product_id: '1' },
      { product_id: 2, value: 200, order_id: 22, legacy_product_id: '2' },
      { product_id: 3, value: 300, order_id: 33, legacy_product_id: '3' },
    ];

    const expectedProductIds = orderEntries.map(entry => entry.product_id);

    const result = await usecase.execute(orderEntries[Symbol.iterator]());

    expect(pushOrderEntryToStore.execute).toHaveBeenCalledTimes(orderEntries.length);
    expect(result).toEqual(expectedProductIds);
  });
});
