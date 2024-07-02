import { OrderEntry, OrderTotalCalculate } from '../domains';

export class OrderTotalCalculateUseCase implements OrderTotalCalculate {
  execute(orderEntries: IterableIterator<OrderEntry>): number {
    let total = 0;

    for (const entry of orderEntries) {
      total += entry.total;
    }
    return total;
  }
}
