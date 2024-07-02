import { OrderEntry } from './order-entry.domain';

export interface BulkOrderEntryUpsert {
  execute(orderEntries: IterableIterator<OrderEntry[]>): Promise<number[]>;
}
