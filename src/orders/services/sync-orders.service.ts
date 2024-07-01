import { Logger } from '@nestjs/common';
import { ProcessLegacyOrderFile } from '@src/core/orders/domains/process-legacy-order-file.domain';
import { PushUserEntryToStore } from '@src/core/users/domains';
import { SyncOrder } from '../domains/sync-orders.domain';

export class SyncOrderService implements SyncOrder {
  private logger = new Logger(SyncOrderService.name);

  constructor(
    private readonly processLegacyOrderFileUsecase: ProcessLegacyOrderFile,
    private readonly upsertUserUseCase: PushUserEntryToStore,
  ) {}

  async execute(file: Buffer) {
    const procesedLines = await this.processLegacyOrderFileUsecase.execute(file);

    const users = new Set(procesedLines.map(line => line.user.user_id));
    this.logger.log(`Mapped users ${users.size} to upsert`);
    const orders = new Set(procesedLines.map(line => line.order.order_id));
    console.log(orders);
    throw new Error('Not implemented');
  }
}
