import { Test, TestingModule } from '@nestjs/testing';
import { BulkOrderItemEntryUpsert } from '@src/core/order-items/domains';
import {
  BulkOrderEntryUpsert,
  OrderProcessOutput,
  ProcessLegacyOrderFile,
} from '@src/core/orders/domains';
import { BulkUserEntryUpsert } from '@src/core/users/domains';
import { SyncOrderService } from './sync-orders.impl';

describe('SyncOrderService', () => {
  let service: SyncOrderService;
  let processLegacyOrderFile: jest.Mocked<ProcessLegacyOrderFile>;
  let bulkUserEntryUpsert: jest.Mocked<BulkUserEntryUpsert>;
  let bulkOrderEntryUpsert: jest.Mocked<BulkOrderEntryUpsert>;
  let bulkOrderItemEntryUpsert: jest.Mocked<BulkOrderItemEntryUpsert>;

  beforeEach(async () => {
    processLegacyOrderFile = { execute: jest.fn() } as any;
    bulkUserEntryUpsert = { execute: jest.fn() } as any;
    bulkOrderEntryUpsert = { execute: jest.fn() } as any;
    bulkOrderItemEntryUpsert = { execute: jest.fn() } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: ProcessLegacyOrderFile, useValue: processLegacyOrderFile },
        { provide: BulkUserEntryUpsert, useValue: bulkUserEntryUpsert },
        { provide: BulkOrderEntryUpsert, useValue: bulkOrderEntryUpsert },
        { provide: BulkOrderItemEntryUpsert, useValue: bulkOrderItemEntryUpsert },
        SyncOrderService,
      ],
    }).compile();

    service = module.get<SyncOrderService>(SyncOrderService);
  });

  it('should execute sync order service', async () => {
    const file: Buffer = Buffer.from('test file content');
    const procesedLines: OrderProcessOutput[] = [
      {
        order: { order_id: 1, user_id: 1, order_date: new Date(), total: 10 },
        orderItem: { product_id: 1, value: 10, order_id: 1 },
        user: { user_id: 1, user_name: 'user1' },
      },
      {
        order: { order_id: 1, user_id: 1, order_date: new Date(), total: 11 },
        orderItem: { product_id: 2, value: 11, order_id: 1 },
        user: { user_id: 1, user_name: 'user1' },
      },
      // more processed lines
    ];

    jest.spyOn(processLegacyOrderFile, 'execute').mockResolvedValue(procesedLines);

    await service.execute(file);

    expect(processLegacyOrderFile.execute).toHaveBeenCalledWith(file);
    expect(bulkUserEntryUpsert.execute).toHaveBeenCalledWith(
      new Map(procesedLines.map(line => [line.user.user_id, line.user])).values(),
    );
    expect(bulkOrderEntryUpsert.execute).toHaveBeenCalledWith(
      new Map([[1, procesedLines.map(order => order.order)]]).values(),
    );
    expect(bulkOrderItemEntryUpsert.execute).toHaveBeenCalledWith(
      procesedLines.map(order => order.orderItem)[Symbol.iterator](),
    );
  });
});
