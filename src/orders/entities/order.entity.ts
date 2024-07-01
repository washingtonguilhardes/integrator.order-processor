import { OrderEntry } from '@src/core/orders/domains';

export class Order implements OrderEntry {
  order_id: number;

  user_id: number;
}
