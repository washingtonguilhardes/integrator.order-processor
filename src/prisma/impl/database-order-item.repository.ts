import { Prisma } from '@prisma/client';
import { OrderItemEntry } from '@src/core/order-items/domains';
import { OrderItemRepository } from '@src/core/order-items/repositories';

export class DatabaseOrderItemRepository implements OrderItemRepository {
  constructor(private readonly orderItemRepository: Prisma.OrderItemDelegate) {}

  async save(orderItem: OrderItemEntry): Promise<void> {
    const legacy = String(orderItem.legacy_product_id);

    await this.orderItemRepository.upsert({
      create: {
        value: orderItem.value,
        order_id: orderItem.order_id,
        legacy_product_id: legacy,
        product_id: orderItem.product_id,
      },
      update: { value: orderItem.value, legacy_product_id: legacy },
      where: {
        // pode ser que tenha items duplicados
        order_id: orderItem.order_id,
        value: orderItem.value,
        product_id: orderItem.product_id ?? Number(orderItem.legacy_product_id),
      },
    });
  }

  async getByOrderId(orderId: number): Promise<OrderItemEntry[]> {
    return await this.orderItemRepository.findMany({
      where: {
        order_id: orderId,
      },
    });
  }
}
