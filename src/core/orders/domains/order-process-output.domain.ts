import { OrderItemEntry } from '@src/core/order-items/domains';
import { UserEntry } from '@src/core/users/domains';
import { OrderEntry } from './order-entry.domain';

export interface OrderProcessOutput {
  user: UserEntry;
  order: OrderEntry;
  orderItem: OrderItemEntry;
}
