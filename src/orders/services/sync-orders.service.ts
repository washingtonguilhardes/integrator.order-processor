import { Logger } from '@nestjs/common';
import { ProcessLegacyOrderFile } from '@src/core/orders/domains/process-legacy-order-file.domain';
import { UserEntryBulkUpsert } from '@src/core/users/domains';
import { SyncOrder } from '../domains/sync-orders.domain';

export class SyncOrderService implements SyncOrder {
  private logger = new Logger(SyncOrderService.name);

  constructor(
    private readonly processLegacyOrderFileUsecase: ProcessLegacyOrderFile,
    private readonly bulkUpsertUserEntry: UserEntryBulkUpsert,
  ) {}

  async execute(file: Buffer) {
    const procesedLines = await this.processLegacyOrderFileUsecase.execute(file);

    const users = new Map(procesedLines.map(line => [line.user.user_id, line.user]));

    this.logger.log(`Mapped users ${users.size} to upsert`);

    await this.bulkUpsertUserEntry.execute(users.values());

    const orders = new Map(procesedLines.map(line => [line.order.order_id, line.order]));

    console.log(orders);
    throw new Error('Not implemented');
  }
}
