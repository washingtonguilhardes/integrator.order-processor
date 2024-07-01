import { OrderProcessOutput } from './order-process-output.domain';

export interface OrderEntryLineProcessorForLegacyEntry {
  execute(line: string): Promise<OrderProcessOutput>;
}
