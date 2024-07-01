import * as dayjs from 'dayjs';

import { DefaultLineDataExtractorStrategy } from './line-data-extractor.strategy';

export class OrderDateExtractorStrategy extends DefaultLineDataExtractorStrategy<Date> {
  validate(value: string): boolean {
    if (!dayjs(value, 'YYYYMMDD').isValid()) {
      throw new Error(`Invalid date: ${value}`);
    }
    return true;
  }

  transform(value: string): Date {
    return dayjs(value, 'YYYYMMDD').toDate();
  }
}
