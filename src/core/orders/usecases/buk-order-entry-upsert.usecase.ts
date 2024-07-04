import { BulkOrderEntryUpsert, OrderEntry } from '../domains';

export class BulkOrderEntryUpsertUseCase
  extends BulkOrderEntryUpsert
  implements BulkOrderEntryUpsert
{
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
