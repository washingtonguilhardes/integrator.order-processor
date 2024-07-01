import { LineDataExtractorStrategy } from '../domains/line-data-extrator-strategy.domain';
import { OrderLineExtractorAdapter } from '../domains/order-line-extractor-adapter.domain';

export class OrderLineExtractorAdapterUseCase implements OrderLineExtractorAdapter {
  constructor(
    private readonly orderLineMapper: Map<string, LineDataExtractorStrategy<unknown>>,
  ) {}

  execute(line: string): Map<string, unknown> {
    const data = new Map<string, unknown>();
    for (const [key, strategy] of this.orderLineMapper.entries()) {
      data.set(key, strategy.execute(line));
    }
    return data;
  }
}
