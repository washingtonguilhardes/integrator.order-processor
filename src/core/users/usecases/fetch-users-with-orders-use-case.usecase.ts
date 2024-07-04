import { UserEntryWithOrders } from '../domains';
import { FetchUsersWithOrders } from '../domains/fetch-users-with-orders.domain';
import { UserWithOrdersFilter } from '../repositories';

export class FetchUsersWithOrdersUseCase
  extends FetchUsersWithOrders
  implements FetchUsersWithOrders
{
  async execute(filter: UserWithOrdersFilter): Promise<UserEntryWithOrders[]> {
    const { entries } = await this.repository.getAll(filter);
    return entries;
  }
}
