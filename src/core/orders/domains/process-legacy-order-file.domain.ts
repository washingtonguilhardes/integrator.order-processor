import { OrderProcessOutput } from './order-process-output.domain';

export abstract class ProcessLegacyOrderFile {
  abstract execute(file: Buffer): Promise<OrderProcessOutput[]>;
}
export const ProcessLegacyOrderFileKey = Symbol('ProcessLegacyOrderFile');
