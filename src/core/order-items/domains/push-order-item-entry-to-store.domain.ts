import { OrderItemEntry } from './order-item-entry.domain';

export abstract class PushOrderItemEntryToStore {
  abstract execute(orderItem: OrderItemEntry): Promise<number>;
}
