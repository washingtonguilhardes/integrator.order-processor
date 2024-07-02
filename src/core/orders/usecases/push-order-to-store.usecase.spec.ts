import { OrderEntry, OrderRepository } from '../domains';
import { PushOrderEntryToStoreUseCase } from './push-order-to-store.usecase';

describe('PushOrderEntryToStoreUseCase', () => {
  let useCase: PushOrderEntryToStoreUseCase;
  let orderRepository: jest.Mocked<OrderRepository>;

  beforeEach(() => {
    orderRepository = {
      save: jest.fn(),
    } as any;
    useCase = new PushOrderEntryToStoreUseCase(orderRepository);
  });

  it('should save the order entry and return the order ID', async () => {
    const orderEntry: OrderEntry = {
      order_id: 1,
      user_id: 1,
      order_date: new Date(),
      total: 100,
    };

    const id = await useCase.execute(orderEntry);

    expect(orderRepository.save).toHaveBeenCalledWith(orderEntry);
    expect(id).toBe(orderEntry.order_id);
  });
});
