import { UserWithOrdersFilter } from '../repositories';
import { UserEntryWithOrders } from './user-entry.domain';

export interface FetchUsersWithOrders {
  execute(filter?: UserWithOrdersFilter): Promise<UserEntryWithOrders[]>;
}
