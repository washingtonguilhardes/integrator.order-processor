import { OrderEntry, OrderRepository, PushOrderEntryToStore } from '../domains';

export class PushOrderEntryToStoreUseCase implements PushOrderEntryToStore {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(orderEntry: OrderEntry): Promise<number> {
    await this.orderRepository.save(orderEntry);
    return orderEntry.order_id;
  }
}
