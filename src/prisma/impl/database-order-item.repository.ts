import { EnumStatus, Prisma } from '@prisma/client';
import { OrderItemEntry } from '@src/core/order-items/domains';
import { OrderItemRepository } from '@src/core/order-items/repositories';

export class DatabaseOrderItemRepository implements OrderItemRepository {
  constructor(private readonly orderItemRepository: Prisma.OrderItemDelegate) {}

  async save(orderItem: OrderItemEntry): Promise<void> {
    const existingOrderItem = await this.orderItemRepository.findFirst({
      where: {
        order_id: orderItem.order_id,
        product_id: orderItem.product_id,
      },
    });

    let comments = '';
    let status: EnumStatus = EnumStatus.DONE;
    if (existingOrderItem) {
      comments = `Order item already exists with product_id: ${existingOrderItem.product_id} in order_id: ${existingOrderItem.order_id}`;
      status = EnumStatus.NEED_ATTENTION;
    }

    await this.orderItemRepository.create({
      data: {
        value: orderItem.value,
        order_id: orderItem.order_id,
        product_id: orderItem.product_id,
        status,
        comments,
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
