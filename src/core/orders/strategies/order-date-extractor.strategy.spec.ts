import { OrderDateExtractorStrategy } from './order-date-extractor.strategy';

describe('OrderDateExtractorStrategy', () => {
  let strategy: OrderDateExtractorStrategy;

  beforeEach(() => {
    strategy = new OrderDateExtractorStrategy([0, 8]);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('should validate a valid date', () => {
    const validDate = '20220101';
    expect(strategy.validate(validDate)).toBe(true);
  });

  it('should throw an error for an invalid date', () => {
    const invalidDate = 'invalid date';
    expect(() => strategy.validate(invalidDate)).toThrow('Invalid date: invalid date');
  });

  it('should transform a valid date string to a Date object', () => {
    const dateString = '20220101';
    const expectedDate = new Date(2022, 0, 1);
    expect(strategy.transform(dateString)).toEqual(expectedDate);
  });
});
