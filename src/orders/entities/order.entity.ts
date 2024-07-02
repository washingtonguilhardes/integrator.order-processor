import { OrderEntry } from '@src/core/orders/domains';

export class Order implements OrderEntry {
  order_date: Date;

  total: number;

  order_id: number;

  user_id: number;
}
