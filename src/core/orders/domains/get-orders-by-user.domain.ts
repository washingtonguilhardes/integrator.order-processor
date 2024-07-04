import { OrderEntry } from './order-entry.domain';

export interface GetOrdersByUser {
  execute(user_id: number): Promise<OrderEntry[]>;
}
export const GetOrdersByUserKey = Symbol('GetOrdersByUser');
