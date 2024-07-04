import { UserWithOrdersFilter, UserWithOrdersRepository } from '../repositories';
import { UserEntryWithOrders } from './user-entry.domain';

export abstract class FetchUsersWithOrders {
  constructor(protected readonly repository: UserWithOrdersRepository) {}

  abstract execute(filter?: UserWithOrdersFilter): Promise<UserEntryWithOrders[]>;
}
export const FetchUsersWithOrdersKey = Symbol('FetchUsersWithOrders');
