import { BulkOrderItemEntryUpsert, OrderItemEntry } from '../domains';

export class BulkOrderItemEntryUpsertUseCase
  extends BulkOrderItemEntryUpsert
  implements BulkOrderItemEntryUpsert
{
  async execute(orderEntries: IterableIterator<OrderItemEntry>): Promise<number[]> {
    const productIds: number[] = [];
    for (const orderEntry of orderEntries) {
      await this.pushOrderEntryToStore.execute(orderEntry);
      productIds.push(orderEntry.product_id);
    }
    return productIds;
  }
}
