import { ProcessLegacyOrderFile } from '@src/core/orders/domains/process-legacy-order-file.domain';
import { SyncOrder } from '../domains/sync-orders.domain';

export class SyncOrderService implements SyncOrder {
  constructor(private readonly processLegacyOrderFileUsecase: ProcessLegacyOrderFile) {}

  async execute(file: Buffer) {
    console.log(file);
    await this.processLegacyOrderFileUsecase.execute(file);
  }
}
