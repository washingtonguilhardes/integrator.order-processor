import { OrderEntry, OrderEntryWithProducts } from '../domains/order-entry.domain';

export interface OrderRepository {
  save(order: OrderEntry): Promise<number>;
  findAll(interval?: [string, string][]): Promise<OrderEntryWithProducts[]>;
  getOneByItem(orderId: number): Promise<OrderEntryWithProducts | null>;
}
export const ORDER_REPOSITORY = Symbol('OrderRepository');
