import { OrderEntry } from './order-entry.domain';

export interface OrderRepository {
  save(order: OrderEntry): Promise<number>;
  find(orderId: number): Promise<OrderEntry | null>;
  findAll(): Promise<OrderEntry[]>;
}
export const ORDER_REPOSITORY = Symbol('OrderRepository');
