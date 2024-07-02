import { OrderItemEntry } from './order-item-entry.domain';

export interface BulkOrderItemEntryUpsert {
  execute(orderEntries: IterableIterator<OrderItemEntry>): Promise<number[]>;
}
