import { OrderEntry } from '../domains/order-entry.domain';

export abstract class OrderRepository {
  abstract save(order: OrderEntry): Promise<number>;
}
export const ORDER_REPOSITORY = Symbol('OrderRepository');
