import { DefaultLineDataExtractorStrategy } from './line-data-extractor.strategy';

class ConcreteLineDataExtractorStrategy extends DefaultLineDataExtractorStrategy<string> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(_value: string): boolean {
    return true;
  }

  transform(value: string): string {
    return value.toUpperCase();
  }
}

describe('DefaultLineDataExtractorStrategy', () => {
  const range: [number, number] = [0, 5];
  let strategy: ConcreteLineDataExtractorStrategy;

  beforeEach(() => {
    strategy = new ConcreteLineDataExtractorStrategy(range);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('should extract and transform the line data', () => {
    const transform = jest.spyOn(strategy, 'transform');
    const validate = jest.spyOn(strategy, 'validate').mockReturnValue(true);
    const line = '1234567890';
    const expectedOutput = '12345';

    const result = strategy.execute(line);

    expect(validate).toHaveBeenCalledWith(expectedOutput);
    expect(transform).toHaveBeenCalledWith(expectedOutput);

    expect(result).toEqual(expectedOutput);
  });
});
