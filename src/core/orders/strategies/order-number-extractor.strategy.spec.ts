import { OrderNumberExtractorStrategy } from './order-number-extractor.strategy';

describe('OrderNumberExtractorStrategy', () => {
  let strategy: OrderNumberExtractorStrategy;

  beforeEach(() => {
    strategy = new OrderNumberExtractorStrategy([0, 10]);
  });

  it('should validate a valid number', () => {
    const value = '123';
    expect(strategy.validate(value)).toBe(true);
  });

  it('should throw an error for an invalid number', () => {
    const value = 'abc';
    expect(() => strategy.validate(value)).toThrow('Invalid number: abc');
  });

  it('should transform a valid number', () => {
    const value = '00000000000456';
    expect(strategy.transform(value)).toBe(456);
  });
});
