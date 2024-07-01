import { OrderItemEntry } from './order-item-entry.domain';

export interface PushOrderItemToStore {
  execute(orderItem: OrderItemEntry): void;
}
