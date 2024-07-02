import { OrderItemEntry } from './order-item-entry.domain';

export interface PushOrderItemEntryToStore {
  execute(orderItem: OrderItemEntry): Promise<number>;
}
