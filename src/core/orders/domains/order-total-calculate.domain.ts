import { OrderEntry } from './order-entry.domain';

export interface OrderTotalCalculate {
  execute(orderEntries: IterableIterator<OrderEntry>): number;
}
