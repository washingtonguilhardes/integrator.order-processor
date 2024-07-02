import { OrderEntryLineProcessorForLegacyEntry, OrderProcessOutput } from '../domains';
import { ProcessLegacyOrderFile } from '../domains/process-legacy-order-file.domain';

import { createInterface } from 'node:readline';
import { Readable } from 'node:stream';

export class ProcessLegacyOrderFileUsecase implements ProcessLegacyOrderFile {
  constructor(
    private readonly orderEntryLineProcessorForLevacyEntry: OrderEntryLineProcessorForLegacyEntry,
  ) {}

  async execute(file: Buffer): Promise<OrderProcessOutput[]> {
    const output: OrderProcessOutput[] = [];

    const lineStreamReader = createInterface({
      input: Readable.from(file),
      crlfDelay: Infinity,
    });

    for await (const line of lineStreamReader) {
      output.push(await this.orderEntryLineProcessorForLevacyEntry.execute(line));
    }

    return output;
  }
}
