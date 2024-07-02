import { GetAllOrdersGroupedByUsers, UserEntryWithOrders } from '@src/core/users/domains';
import { UserRepository } from '@src/core/users/repositories';

export class GetAllUsersWithOrdersImpl implements GetAllOrdersGroupedByUsers {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserEntryWithOrders[]> {
    const users = await this.userRepository.getAll();
    return users.map(user => ({
      ...user,
      orders: orders.filter(order => order.userId === user.id),
    }));
  }
}
