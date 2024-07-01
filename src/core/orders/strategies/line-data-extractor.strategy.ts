import { LineDataExtractorStrategy } from '../domains/line-data-extrator-strategy.domain';

export abstract class DefaultLineDataExtractorStrategy<T>
  implements LineDataExtractorStrategy<T>
{
  constructor(private readonly range: [number, number]) {}

  execute(line: string): T {
    const [start, end] = this.range;
    const value = line.slice(start, end).trim();
    this.validate(value);

    return this.transform(value);
  }

  abstract validate(value: string): boolean;

  abstract transform(value: string): T;
}
