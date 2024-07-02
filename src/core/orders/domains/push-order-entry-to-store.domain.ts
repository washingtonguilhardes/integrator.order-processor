import { OrderEntry } from './order-entry.domain';

export interface PushOrderEntryToStore {
  execute(orderEntry: OrderEntry): Promise<number>;
}
