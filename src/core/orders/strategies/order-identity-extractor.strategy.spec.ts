import { OrderIdentityExtractorStrategy } from './order-identity-extractor.strategy';

describe('OrderIdentityExtractorStrategy', () => {
  let strategy: OrderIdentityExtractorStrategy;

  beforeEach(() => {
    strategy = new OrderIdentityExtractorStrategy([0, 10]);
  });

  it('should validate a valid identity', () => {
    const value = '0000000090';
    const result = strategy.validate(value);
    expect(result).toBe(true);
  });

  it('should throw an error for an invalid identity', () => {
    const value = 'abc';
    expect(() => strategy.validate(value)).toThrowError('Invalid identity: abc');
  });

  it('should transform a string value to a number', () => {
    const value = '0000000090';
    const result = strategy.transform(value);
    expect(result).toBe(90);
  });
});
