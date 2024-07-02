import { OrderItemEntry, PushOrderItemEntryToStore } from '../domains';
import { OrderItemRepository } from '../repositories';

export class PushOrderItemToStoreUsecase implements PushOrderItemEntryToStore {
  constructor(private readonly orderItemRepository: OrderItemRepository) {}

  async execute(orderItem: OrderItemEntry): Promise<number> {
    await this.orderItemRepository.save({
      value: orderItem.value,
      order_id: orderItem.order_id,
      legacy_product_id: orderItem.legacy_product_id,
    });
    return orderItem.product_id;
  }
}
