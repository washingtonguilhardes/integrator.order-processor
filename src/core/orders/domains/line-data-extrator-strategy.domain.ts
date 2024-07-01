export interface LineDataExtractorStrategy<T> {
  execute(line: string): T;
}
