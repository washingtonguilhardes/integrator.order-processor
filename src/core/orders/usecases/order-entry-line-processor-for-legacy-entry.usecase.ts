import { OrderEntryLineProcessorForLegacyEntry, OrderProcessOutput } from '../domains';
import { OrderLineExtractorAdapter } from '../domains/order-line-extractor-adapter.domain';

export class OrderEntryLineProcessorForLegacyEntryUseCase
  implements OrderEntryLineProcessorForLegacyEntry
{
  constructor(private readonly orderLineExtractor: OrderLineExtractorAdapter) {}

  execute(line: string): Promise<OrderProcessOutput> {
    const [...data] = this.orderLineExtractor.execute(line);
    console.log('Processing line:', data);
    throw new Error('Method not implemented.');
  }
}
