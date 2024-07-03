import { UserEntryWithOrders } from '../domains';
import { FetchUsersWithOrders } from '../domains/fetch-users-with-orders.domain';
import { UserWithOrdersFilter, UserWithOrdersRepository } from '../repositories';

export class FetchUsersWithOrdersUseCase implements FetchUsersWithOrders {
  constructor(private readonly repository: UserWithOrdersRepository) {}

  async execute(filter: UserWithOrdersFilter): Promise<UserEntryWithOrders[]> {
    const { entries } = await this.repository.getAll(filter);
    return entries;
  }
}
