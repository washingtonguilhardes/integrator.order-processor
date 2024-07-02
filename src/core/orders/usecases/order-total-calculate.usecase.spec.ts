import { OrderEntry } from '../domains';
import { OrderTotalCalculateUseCase } from './order-total-calculate.usecase';

describe('OrderTotalCalculateUseCase', () => {
  let usecase: OrderTotalCalculateUseCase;

  beforeEach(() => {
    usecase = new OrderTotalCalculateUseCase();
  });

  it('should calculate the total order value correctly', () => {
    const orderEntries: OrderEntry[] = [
      {
        order_date: new Date(),
        order_id: 1,
        total: 10,
        user_id: 1,
      },
      {
        order_date: new Date(),
        order_id: 1,
        total: 10,
        user_id: 1,
      },
    ];
    const expectedTotal = orderEntries.reduce((acc, entry) => acc + entry.total, 0);
    const result = usecase.execute(orderEntries[Symbol.iterator]());

    expect(result).toEqual(expectedTotal);
  });

  it('should return 0 when there are no order entries', () => {
    const orderEntries: OrderEntry[] = [];

    const result = usecase.execute(orderEntries[Symbol.iterator]());

    expect(result).toEqual(0);
  });
});
