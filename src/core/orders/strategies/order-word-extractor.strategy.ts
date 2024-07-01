import { DefaultLineDataExtractorStrategy } from './line-data-extractor.strategy';

export class OrderWordExtractorStrategy extends DefaultLineDataExtractorStrategy<string> {
  validate(value: string): boolean {
    if (!value.trim()) {
      throw new Error(`Invalid word; it could not be empty`);
    }
    return true;
  }

  transform(value: string): string {
    return value.trim();
  }
}
