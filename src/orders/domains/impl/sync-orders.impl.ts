import { Inject, Injectable, Logger } from '@nestjs/common';
import { BulkOrderItemEntryUpsert } from '@src/core/order-items/domains';
import {
  BulkOrderEntryUpsert,
  OrderEntry,
  ProcessLegacyOrderFile,
} from '@src/core/orders/domains';
import { BulkUserEntryUpsert } from '@src/core/users/domains';
import { SyncOrder } from '../sync-orders.domain';

@Injectable()
export class SyncOrderService implements SyncOrder {
  private logger = new Logger(SyncOrderService.name);

  constructor(
    @Inject(ProcessLegacyOrderFile)
    private readonly processLegacyOrderFile: ProcessLegacyOrderFile,
    @Inject(BulkUserEntryUpsert)
    private readonly bulkUserEntryUpsert: BulkUserEntryUpsert,
    @Inject(BulkOrderEntryUpsert)
    private readonly bulkOrderEntryUpsert: BulkOrderEntryUpsert,
    @Inject(BulkOrderItemEntryUpsert)
    private readonly bulkOrderItemEntryUpsert: BulkOrderItemEntryUpsert,
  ) {}

  async execute(file: Buffer) {
    const procesedLines = await this.processLegacyOrderFile.execute(file);

    const users = new Map(procesedLines.map(line => [line.user.user_id, line.user]));

    await this.bulkUserEntryUpsert.execute(users.values());

    const orders = new Map<number, OrderEntry[]>();
    const orderIds = new Set(procesedLines.map(order => order.order.order_id));

    for (const orderId of orderIds) {
      orders.set(
        orderId,
        procesedLines
          .filter(order => order.order.order_id === orderId)
          .map(order => order.order),
      );
    }

    this.logger.log(`Mapped orders ${orderIds.size} to upsert`);

    await this.bulkOrderEntryUpsert.execute(orders.values());

    await this.bulkOrderItemEntryUpsert.execute(
      procesedLines.map(order => order.orderItem)[Symbol.iterator](),
    );
  }
}
