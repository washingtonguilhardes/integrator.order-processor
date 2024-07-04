import { OrderItemEntry } from './order-item-entry.domain';
import { PushOrderItemEntryToStore } from './push-order-item-entry-to-store.domain';

export abstract class BulkOrderItemEntryUpsert {
  constructor(protected readonly pushOrderEntryToStore: PushOrderItemEntryToStore) {}

  abstract execute(orderEntries: IterableIterator<OrderItemEntry>): Promise<number[]>;
}
export const BulkOrderItemEntryUpsertKey = Symbol('BulkOrderItemEntryUpsert');
