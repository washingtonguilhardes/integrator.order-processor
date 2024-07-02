import { OrderEntryWithProducts } from '@src/core/orders/domains';

export interface UserEntry {
  user_id: number;
  user_name: string;
}

export interface UserEntryWithOrders extends UserEntry {
  orders: OrderEntryWithProducts[];
}
