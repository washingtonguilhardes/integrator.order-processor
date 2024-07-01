export interface OrderLineExtractorAdapter {
  execute(line: string): Map<string, unknown>;
}
