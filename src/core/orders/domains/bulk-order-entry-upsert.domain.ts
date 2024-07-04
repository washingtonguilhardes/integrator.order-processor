import { OrderEntry } from './order-entry.domain';
import { OrderTotalCalculate } from './order-total-calculate.domain';
import { PushOrderEntryToStore } from './push-order-entry-to-store.domain';

export abstract class BulkOrderEntryUpsert {
  constructor(
    protected readonly pushOrderEntryToStore: PushOrderEntryToStore,
    protected readonly orderTotalCalculate: OrderTotalCalculate,
  ) {}

  abstract execute(orderEntries: IterableIterator<OrderEntry[]>): Promise<number[]>;
}
export const BulkOrderEntryUpsertKey = Symbol('BulkOrderEntryUpsert');
