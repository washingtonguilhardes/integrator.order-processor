import { Prisma } from '@prisma/client';
import {
  OrderEntry,
  OrderEntryWithProducts,
  OrderRepository,
} from '@src/core/orders/domains';

export class DatabaseOrderRepository implements OrderRepository {
  constructor(private readonly orderRepository: Prisma.OrderDelegate) {}

  findAll(interval?: [string, string][]): Promise<OrderEntryWithProducts[]> {
    throw new Error('Method not implemented.');
  }

  getOneByItem(orderId: number): Promise<OrderEntryWithProducts> {
    throw new Error('Method not implemented.');
  }

  async save(orderEntry: OrderEntry): Promise<number> {
    await this.orderRepository.upsert({
      create: {
        order_id: orderEntry.order_id,
        date: orderEntry.order_date,
        total: orderEntry.total,
        user_id: orderEntry.user_id,
      },
      update: { date: orderEntry.order_date, total: orderEntry.total },
      where: { order_id: orderEntry.order_id },
    });
    return orderEntry.order_id;
  }
}
