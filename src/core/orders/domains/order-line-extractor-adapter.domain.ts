import { LegacyOrderFields } from '../enums';

export interface OrderLineExtractorAdapter {
  execute(line: string): Map<LegacyOrderFields, unknown>;
}
export const OrderLineExtractorAdapterKey = Symbol('OrderLineExtractorAdapter');
