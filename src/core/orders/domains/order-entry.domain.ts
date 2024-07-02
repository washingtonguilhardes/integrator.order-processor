import { OrderItemEntry } from '@src/core/order-items/domains';

export interface OrderEntry {
  order_id: number;
  user_id: number;
  order_date: Date;
  total: number;
}

export interface OrderEntryWithProducts extends OrderEntry {
  products: OrderItemEntry[];
}
