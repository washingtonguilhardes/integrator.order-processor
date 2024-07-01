import { OrderProcessOutput } from './order-process-output.domain';

export interface ProcessLegacyOrderFile {
  execute(file: Buffer): Promise<OrderProcessOutput[]>;
}
