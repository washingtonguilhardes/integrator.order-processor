import { OrderEntryLineProcessorForLegacyEntry, OrderProcessOutput } from '../domains';
import { OrderLineExtractorAdapter } from '../domains/order-line-extractor-adapter.domain';
import { LegacyOrderFields } from '../enums';

export class OrderEntryLineProcessorForLegacyEntryUseCase
  implements OrderEntryLineProcessorForLegacyEntry
{
  constructor(private readonly orderLineExtractor: OrderLineExtractorAdapter) {}

  async execute(line: string): Promise<OrderProcessOutput> {
    const data = this.orderLineExtractor.execute(line);
    return {
      user: {
        user_id: data.get(LegacyOrderFields.USER_ID) as number,
        user_name: data.get(LegacyOrderFields.USER_NAME) as string,
      },
      order: {
        order_id: data.get(LegacyOrderFields.ORDER_ID) as number,
        user_id: data.get(LegacyOrderFields.USER_ID) as number,
      },
      orderItem: {
        product_id: data.get(LegacyOrderFields.PRODUCT_ID) as number,
        value: data.get(LegacyOrderFields.PRODUCT_PRICE) as number,
        order_id: data.get(LegacyOrderFields.ORDER_ID) as number,
      },
    };
  }
}
