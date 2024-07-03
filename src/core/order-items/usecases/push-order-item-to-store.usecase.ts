import { OrderItemEntry, PushOrderItemEntryToStore } from '../domains';
import { OrderItemRepository } from '../repositories';

export class PushOrderItemToStoreUsecase implements PushOrderItemEntryToStore {
  constructor(private readonly orderItemRepository: OrderItemRepository) {}

  async execute(orderItem: OrderItemEntry): Promise<number> {
    await this.orderItemRepository.save(orderItem);
    return orderItem.product_id;
  }
}
