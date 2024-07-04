import { FetchUsersWithOrders, UserEntryWithOrders } from '@src/core/users/domains';
import { UserWithOrdersFilter } from '@src/core/users/repositories';

export abstract class GetAllUsersWithOrders {
  constructor(protected readonly fetchUsersWithOrders: FetchUsersWithOrders) {}

  abstract execute(filter?: UserWithOrdersFilter): Promise<UserEntryWithOrders[]>;
}
export const GetAllUsersWithOrdersKey = Symbol('GetAllUsersWithOrders');
