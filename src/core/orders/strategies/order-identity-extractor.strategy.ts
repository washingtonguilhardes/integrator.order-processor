import { DefaultLineDataExtractorStrategy } from './line-data-extractor.strategy';

export class OrderIdentityExtractorStrategy extends DefaultLineDataExtractorStrategy<number> {
  validate(value: string): boolean {
    const nvalue = Number(value.trim());
    if (isNaN(nvalue)) {
      throw new Error(`Invalid identity: ${value}`);
    }
    return true;
  }

  transform(value: string): number {
    return Number(value.trim());
  }
}
