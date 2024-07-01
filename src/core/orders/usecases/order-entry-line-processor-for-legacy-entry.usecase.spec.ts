import { OrderLineExtractorAdapter } from '../domains/order-line-extractor-adapter.domain';
import { LegacyOrderFields } from '../enums';
import { OrderEntryLineProcessorForLegacyEntryUseCase } from './order-entry-line-processor-for-legacy-entry.usecase';

describe('OrderEntryLineProcessorForLegacyEntryUseCase', () => {
  let useCase: OrderEntryLineProcessorForLegacyEntryUseCase;
  let orderLineExtractor: OrderLineExtractorAdapter;

  beforeEach(() => {
    orderLineExtractor = { execute: jest.fn() } as OrderLineExtractorAdapter;
    useCase = new OrderEntryLineProcessorForLegacyEntryUseCase(orderLineExtractor);
  });

  it('should process the order entry line correctly', async () => {
    const mockData = new Map<LegacyOrderFields, unknown>([
      [LegacyOrderFields.USER_ID, 1],
      [LegacyOrderFields.USER_NAME, 'John Doe'],
      [LegacyOrderFields.ORDER_ID, 123],
      [LegacyOrderFields.PRODUCT_ID, 456],
      [LegacyOrderFields.PRODUCT_PRICE, 9.99],
    ]);
    jest.spyOn(orderLineExtractor, 'execute').mockReturnValue(mockData);

    const expectedOutput = {
      user: {
        user_id: 1,
        user_name: 'John Doe',
      },
      order: {
        order_id: 123,
        user_id: 1,
      },
      orderItem: {
        product_id: 456,
        value: 9.99,
        order_id: 123,
      },
    };

    const line = 'example order entry line';
    const result = await useCase.execute(line);

    expect(result).toEqual(expectedOutput);
    expect(orderLineExtractor.execute).toHaveBeenCalledWith(line);
  });
});
