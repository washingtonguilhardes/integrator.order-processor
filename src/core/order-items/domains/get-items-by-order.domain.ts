import { OrderItemEntry } from './order-item-entry.domain';

export interface GetOrderItemsByOrder {
  execute(orderId: number): Promise<OrderItemEntry[]>;
}
