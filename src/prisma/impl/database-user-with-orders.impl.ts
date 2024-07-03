import { Prisma } from '@prisma/client';
import { PaginatedResponse } from '@src/core/shared/repositories';
import { UserEntryWithOrders } from '@src/core/users/domains';
import {
  UserWithOrdersFilter,
  UserWithOrdersRepository,
} from '@src/core/users/repositories';
import * as dayjs from 'dayjs';

export class UserWithOrdersRepositoryImpl implements UserWithOrdersRepository {
  constructor(
    private readonly userRepository: Prisma.OrderUserDelegate,
    private readonly orderRepository: Prisma.OrderDelegate,
  ) {}

  async getAll(
    filter: UserWithOrdersFilter,
  ): Promise<PaginatedResponse<UserEntryWithOrders>> {
    const users = await this.userRepository.findMany();

    const userIds = users.map(user => user.user_id);
    const where: Prisma.OrderWhereInput = {
      user_id: { in: userIds },
    };

    if (filter?.orderId) {
      where.order_id = { in: [filter.orderId] };
    }

    if (filter?.interval) {
      const interval: Prisma.DateTimeFilter<'Order'> = {};

      const { start, end } = filter.interval;

      if (start) {
        interval.lte = dayjs(start).toISOString();
      }
      if (end) {
        interval.gte = dayjs(end).toISOString();
      }
      where.date = interval;
    }

    const allorders = await this.orderRepository.findMany({
      where,
      include: { products: true },
    });
    const entries = users
      .map(user => ({
        ...user,
        orders: allorders.filter(order => order.user_id === user.user_id),
      }))
      .filter(records => records.orders.length > 0);

    return {
      entries,
      total: entries.length,
      pageSize: entries.length,
    };
  }

  count(): Promise<number> {
    return this.userRepository.count();
  }
}
