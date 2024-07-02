import {
  BulkOrderEntryUpsert,
  OrderEntry,
  OrderTotalCalculate,
  PushOrderEntryToStore,
} from '../domains';

export class BulkOrderEntryUpsertUseCase implements BulkOrderEntryUpsert {
  constructor(
    private readonly pushOrderEntryToStore: PushOrderEntryToStore,
    private readonly orderTotalCalculate: OrderTotalCalculate,
  ) {}

  async execute(orderEntries: IterableIterator<OrderEntry[]>): Promise<number[]> {
    const orderIds = [];

    for (const [orderEntry, ...data] of orderEntries) {
      const ordersWithItems = [orderEntry, ...data][Symbol.iterator]();
      const entryToSave = {
        ...orderEntry,
        total: this.orderTotalCalculate.execute(ordersWithItems),
      };
      await this.pushOrderEntryToStore.execute(entryToSave);
      orderIds.push(orderEntry.order_id);
    }

    return orderIds;
  }
}
