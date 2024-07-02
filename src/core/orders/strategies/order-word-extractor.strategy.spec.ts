import { OrderWordExtractorStrategy } from './order-word-extractor.strategy';

describe('OrderWordExtractorStrategy', () => {
  let strategy: OrderWordExtractorStrategy;

  beforeEach(() => {
    strategy = new OrderWordExtractorStrategy([5, 45]);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('should validate a non-empty word', () => {
    const value = 'example';
    expect(strategy.validate(value)).toBe(true);
  });

  it('should throw an error for an empty word', () => {
    const value = '';
    expect(() => strategy.validate(value)).toThrow('Invalid word; it could not be empty');
  });

  it('should transform a word by trimming leading and trailing spaces', () => {
    const value = '        example test       ';
    const transformedValue = strategy.transform(value);
    expect(transformedValue).toBe('example test');
  });
  it('e2e', () => {
    const value = 'other       example test';
    const transformedValue = strategy.execute(value);
    expect(transformedValue).toBe('example test');
  });
});
