import { OrderEntryLineProcessorForLegacyEntry, OrderProcessOutput } from '../domains';
import { ProcessLegacyOrderFileUsecase } from './process-legacy-order-file.usecase';

const resultMocker = (): OrderProcessOutput => ({
  order: {
    order_id: 1,
    user_id: 1,
    order_date: new Date(),
    total: 0,
  },
  orderItem: { product_id: 1, value: 1, order_id: 1 },
  user: { user_id: 1, user_name: 'user' },
});
describe('ProcessLegacyOrderFileUsecase', () => {
  let usecase: ProcessLegacyOrderFileUsecase;
  let orderEntryLineProcessor: OrderEntryLineProcessorForLegacyEntry;
  const sampleOrder = resultMocker();

  beforeEach(() => {
    orderEntryLineProcessor = {
      execute: jest.fn().mockResolvedValue(sampleOrder),
    };
    usecase = new ProcessLegacyOrderFileUsecase(orderEntryLineProcessor);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should parse the file and return the output', async () => {
    const file = Buffer.from('line1\nline2\nline3');
    const expectedOutput: OrderProcessOutput[] = [sampleOrder, sampleOrder, sampleOrder];

    const result = await usecase.execute(file);

    expect(orderEntryLineProcessor.execute).toHaveBeenCalledTimes(3);
    expect(orderEntryLineProcessor.execute).toHaveBeenNthCalledWith(1, 'line1');
    expect(orderEntryLineProcessor.execute).toHaveBeenNthCalledWith(2, 'line2');
    expect(orderEntryLineProcessor.execute).toHaveBeenNthCalledWith(3, 'line3');
    expect(result).toEqual(expectedOutput);
  });
});
