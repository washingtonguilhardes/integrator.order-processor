import { OrderItemEntry } from '../domains';

export abstract class OrderItemRepository {
  abstract save(orderItem: OrderItemEntry): Promise<void>;

  abstract getByOrderId(orderId: number): Promise<OrderItemEntry[]>;
}
