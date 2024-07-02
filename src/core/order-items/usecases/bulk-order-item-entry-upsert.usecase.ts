import {
  BulkOrderItemEntryUpsert,
  OrderItemEntry,
  PushOrderItemEntryToStore,
} from '../domains';

export class BulkOrderItemEntryUpsertUseCase implements BulkOrderItemEntryUpsert {
  constructor(private readonly pushOrderEntryToStore: PushOrderItemEntryToStore) {}

  async execute(orderEntries: IterableIterator<OrderItemEntry>): Promise<number[]> {
    const productIds: number[] = [];
    for (const orderEntry of orderEntries) {
      await this.pushOrderEntryToStore.execute(orderEntry);
      productIds.push(orderEntry.product_id);
    }
    return productIds;
  }
}
