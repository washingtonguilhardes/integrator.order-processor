import { LineDataExtractorStrategy } from '../domains/line-data-extrator-strategy.domain';
import { LegacyOrderFields } from '../enums';
import { OrderLineExtractorAdapterUseCase } from './order-line-extractor-adapter.usecase';

describe('OrderLineExtractorAdapterUseCase', () => {
  let useCase: OrderLineExtractorAdapterUseCase;
  let strategyMock: jest.Mocked<LineDataExtractorStrategy<unknown>>;
  const expectedData = 'extracted name';
  beforeEach(() => {
    strategyMock = { execute: jest.fn().mockReturnValue(expectedData) };
    useCase = new OrderLineExtractorAdapterUseCase([
      LegacyOrderFields.USER_NAME,
      strategyMock,
    ]);
  });

  it('should execute the line data extraction strategies and return the extracted data', () => {
    const line = 'sample line';
    const extractedData = new Map<LegacyOrderFields, unknown>();
    extractedData.set(LegacyOrderFields.USER_NAME, expectedData);

    strategyMock.execute.mockReturnValue(expectedData);

    const result = useCase.execute(line);

    expect(strategyMock.execute).toHaveBeenCalledTimes(1);
    expect(strategyMock.execute).toHaveBeenCalledWith(line);
    expect(result).toEqual(extractedData);
  });

  it('should throw an error if an exception occurs during data extraction', () => {
    const line = 'sample line';
    const errorMessage = `Error extracting data from line: sample line, ok key: ${LegacyOrderFields.USER_NAME}`;

    strategyMock.execute.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    expect(() => useCase.execute(line)).toThrow(errorMessage);
  });
});
