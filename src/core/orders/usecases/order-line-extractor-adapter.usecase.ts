import { LineDataExtractorStrategy } from '../domains/line-data-extrator-strategy.domain';
import { OrderLineExtractorAdapter } from '../domains/order-line-extractor-adapter.domain';
import { LegacyOrderFields } from '../enums';

export class OrderLineExtractorAdapterUseCase implements OrderLineExtractorAdapter {
  private orderLineMapper: Map<LegacyOrderFields, LineDataExtractorStrategy<unknown>>;

  constructor(...strategies: [LegacyOrderFields, LineDataExtractorStrategy<unknown>][]) {
    this.orderLineMapper = new Map<LegacyOrderFields, LineDataExtractorStrategy<unknown>>(
      strategies,
    );
  }

  execute(line: string): Map<LegacyOrderFields, unknown> {
    const data = new Map<LegacyOrderFields, unknown>();
    for (const [key, strategy] of this.orderLineMapper.entries()) {
      try {
        data.set(key, strategy.execute(line));
      } catch (error) {
        throw new Error(`Error extracting data from line: ${line}, ok key: ${key}`);
      }
    }
    return data;
  }
}
