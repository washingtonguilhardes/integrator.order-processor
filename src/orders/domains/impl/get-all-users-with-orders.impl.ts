import { FetchUsersWithOrders, UserEntryWithOrders } from '@src/core/users/domains';
import { UserWithOrdersFilter } from '@src/core/users/repositories';
import { GetAllUsersWithOrders } from '../get-all-users-with-orders.domain';

export class GetAllUsersWithOrdersImpl implements GetAllUsersWithOrders {
  constructor(private readonly fetchUsersWithOrders: FetchUsersWithOrders) {}

  async execute(filter?: UserWithOrdersFilter): Promise<UserEntryWithOrders[]> {
    return this.fetchUsersWithOrders.execute(filter);
  }
}
