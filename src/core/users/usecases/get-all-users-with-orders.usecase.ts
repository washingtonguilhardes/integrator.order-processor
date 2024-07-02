import { GetAllUsersWithOrders } from '@src/orders/domains';
import { UserEntryWithOrders } from '../domains';
import { UserWithOrdersRepository } from '../repositories';

export class GetAllUsersWithOrdersUseCase implements GetAllUsersWithOrders {
  constructor(private readonly repository: UserWithOrdersRepository) {}

  async execute(): Promise<UserEntryWithOrders[]> {
    const total = await this.repository.count();
    const users = await this.repository.getAll(0, 10);
  }
}
