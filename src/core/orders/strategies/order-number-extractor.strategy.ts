import { DefaultLineDataExtractorStrategy } from './line-data-extractor.strategy';

export class OrderNumberExtractorStrategy extends DefaultLineDataExtractorStrategy<number> {
  validate(value: string): boolean {
    const nvalue = Number(value.trim());
    if (isNaN(nvalue) || nvalue < 0 || !nvalue) {
      throw new Error(`Invalid number: ${value}`);
    }
    return true;
  }

  transform(value: string): number {
    return Number(value.trim());
  }
}
