import { OrderEntry } from '../../core/orders/domains/order-entry.domain';

export class Order implements OrderEntry {
  order_id: number;

  user_id: number;
}
