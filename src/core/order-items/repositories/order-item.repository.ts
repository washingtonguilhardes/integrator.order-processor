import { OrderItemEntry } from '../domains';

export interface OrderItemRepository {
  save(orderItem: OrderItemEntry): Promise<void>;
  getByOrderId(orderId: number): Promise<OrderItemEntry[]>;
}
