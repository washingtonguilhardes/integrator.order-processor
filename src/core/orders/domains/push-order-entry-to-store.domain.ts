import { OrderEntry } from './order-entry.domain';

export abstract class PushOrderEntryToStore {
  abstract execute(orderEntry: OrderEntry): Promise<number>;
}
export const PushOrderEntryToStoreKey = Symbol('PushOrderEntryToStore');
