import { OrderEntry, OrderTotalCalculate, PushOrderEntryToStore } from '../domains';
import { BulkOrderEntryUpsertUseCase } from './buk-order-entry-upsert.usecase';

describe('BulkOrderEntryUpsertUseCase', () => {
  let useCase: BulkOrderEntryUpsertUseCase;
  let pushOrderEntryToStore: PushOrderEntryToStore;
  let orderTotalCalculate: OrderTotalCalculate;

  beforeEach(() => {
    orderTotalCalculate = {
      execute: jest.fn().mockReturnValue(100),
    };

    pushOrderEntryToStore = {
      execute: jest
        .fn()
        .mockImplementation((orderEntry: OrderEntry) =>
          Promise.resolve(orderEntry.order_id),
        ),
    };
    useCase = new BulkOrderEntryUpsertUseCase(pushOrderEntryToStore, orderTotalCalculate);
  });

  it('should push order entries to store and return order IDs', async () => {
    const orderEntries = [
      [
        { order_id: 1, user_id: 1, order_date: new Date(), total: 100 },
        { order_id: 1, user_id: 1, order_date: new Date(), total: 200 },
      ],
      [
        { order_id: 2, user_id: 1, order_date: new Date(), total: 100 },
        { order_id: 2, user_id: 1, order_date: new Date(), total: 100 },
      ],
    ];

    const result = await useCase.execute(orderEntries[Symbol.iterator]());

    expect(pushOrderEntryToStore.execute).toHaveBeenCalledTimes(2);
    expect(pushOrderEntryToStore.execute).toHaveBeenCalledWith(orderEntries[0][0]);
    expect(pushOrderEntryToStore.execute).toHaveBeenCalledWith(orderEntries[1][0]);
    expect(orderTotalCalculate.execute).toHaveBeenCalledTimes(2);
    expect(orderTotalCalculate.execute).toHaveBeenCalledWith(
      orderEntries[0][Symbol.iterator](),
    );
    expect(result).toEqual([1, 2]);
  });
});
