import { Test, TestingModule } from '@nestjs/testing';
import { GetAllUsersWithOrders, SyncOrder } from './domains';
import { OrdersController } from './orders.controller';

describe('OrdersController', () => {
  let controller: OrdersController;
  let syncOrderService: jest.Mocked<SyncOrder>;
  let getAllUsersWithOrders: jest.Mocked<GetAllUsersWithOrders>;

  beforeEach(async () => {
    syncOrderService = {
      execute: jest.fn(),
    } as any;
    getAllUsersWithOrders = {
      execute: jest.fn(),
    } as any;
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        { provide: SyncOrder, useValue: syncOrderService },
        { provide: GetAllUsersWithOrders, useValue: getAllUsersWithOrders },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('syncOrderService.execute', () => {
    it('should call syncOrderService.execute', async () => {
      const file = { buffer: Buffer.from('test file content') };
      await controller.syncWithLegacy(file as any);
      expect(syncOrderService.execute).toHaveBeenCalledWith(file.buffer);
    });
  });

  describe('getAllUsersWithOrders.execute', () => {
    it('should call getAllUsersWithOrders.execute with filters', async () => {
      const result = { interval: { start: '2021-01-01', end: '2021-01-02' }, orderId: 1 };
      await controller.getOrders('1', '2021-01-01', '2021-01-02');
      expect(getAllUsersWithOrders.execute).toHaveBeenCalledWith(result);
    });
    it('should call getAllUsersWithOrders.execute without filter', async () => {
      const result = { interval: { start: undefined, end: undefined }, orderId: null };
      await controller.getOrders();
      expect(getAllUsersWithOrders.execute).toHaveBeenCalledWith(result);
    });
  });
});
