import { OrderEntry, PushOrderEntryToStore } from '../domains';
import { BulkOrderEntryUpsertUseCase } from './buk-order-entry-upsert.usecase';

describe('BulkOrderEntryUpsertUseCase', () => {
  let useCase: BulkOrderEntryUpsertUseCase;
  let pushOrderEntryToStore: PushOrderEntryToStore;

  beforeEach(() => {
    pushOrderEntryToStore = {
      execute: jest
        .fn()
        .mockImplementation((orderEntry: OrderEntry) =>
          Promise.resolve(orderEntry.order_id),
        ),
    };
    useCase = new BulkOrderEntryUpsertUseCase(pushOrderEntryToStore);
  });

  it('should push order entries to store and return order IDs', async () => {
    const orderEntries: OrderEntry[] = [
      { order_id: 1, user_id: 1, order_date: new Date(), total: 100 },
      { order_id: 2, user_id: 2, order_date: new Date(), total: 200 },
    ];

    const result = await useCase.execute(orderEntries.values());

    expect(pushOrderEntryToStore.execute).toHaveBeenCalledTimes(2);
    expect(pushOrderEntryToStore.execute).toHaveBeenCalledWith(orderEntries[0]);
    expect(pushOrderEntryToStore.execute).toHaveBeenCalledWith(orderEntries[1]);
    expect(result).toEqual([1, 2]);
  });
});
