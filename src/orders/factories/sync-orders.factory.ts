import { LineDataExtractorStrategy } from '@src/core/orders/domains';
import { LegacyOrderFields } from '@src/core/orders/enums';
import {
  OrderDateExtractorStrategy,
  OrderIdentityExtractorStrategy,
  OrderNumberExtractorStrategy,
  OrderWordExtractorStrategy,
} from '@src/core/orders/strategies';
import {
  BulkOrderEntryUpsertUseCase,
  OrderEntryLineProcessorForLegacyEntryUseCase,
  OrderLineExtractorAdapterUseCase,
  OrderTotalCalculateUseCase,
  ProcessLegacyOrderFileUsecase,
  PushOrderEntryToStoreUseCase,
} from '@src/core/orders/usecases';

import {
  BulkOrderItemEntryUpsertUseCase,
  PushOrderItemToStoreUsecase,
} from '@src/core/order-items/usecases';
import {
  BulkUserEntryUpsertUseCase,
  PushUserEntryToStoreUseCase,
} from '@src/core/users/usecases';
import { PrismaService } from '@src/prisma/prisma.service';

import {
  DatabaseOrderItemRepository,
  DatabaseOrderRepository,
  DatabaseUserRepository,
} from '@src/prisma/impl';
import { SyncOrderService } from '../domains';

const extractStrategies: [LegacyOrderFields, LineDataExtractorStrategy<unknown>][] = [
  [LegacyOrderFields.USER_ID, new OrderIdentityExtractorStrategy([0, 10])],
  [LegacyOrderFields.USER_NAME, new OrderWordExtractorStrategy([10, 55])],
  [LegacyOrderFields.ORDER_ID, new OrderIdentityExtractorStrategy([55, 65])],
  [LegacyOrderFields.PRODUCT_ID, new OrderIdentityExtractorStrategy([65, 75])],
  [LegacyOrderFields.PRODUCT_PRICE, new OrderNumberExtractorStrategy([75, 87])],
  [LegacyOrderFields.ORDER_DATE, new OrderDateExtractorStrategy([87, 95])],
];

export const syncOrderFactory = (prismaClientService: PrismaService) =>
  new SyncOrderService(
    new ProcessLegacyOrderFileUsecase(
      new OrderEntryLineProcessorForLegacyEntryUseCase(
        new OrderLineExtractorAdapterUseCase(...extractStrategies),
      ),
    ),
    new BulkUserEntryUpsertUseCase(
      new PushUserEntryToStoreUseCase(
        new DatabaseUserRepository(prismaClientService.orderUser),
      ),
    ),
    new BulkOrderEntryUpsertUseCase(
      new PushOrderEntryToStoreUseCase(
        new DatabaseOrderRepository(prismaClientService.order),
      ),
      new OrderTotalCalculateUseCase(),
    ),
    new BulkOrderItemEntryUpsertUseCase(
      new PushOrderItemToStoreUsecase(
        new DatabaseOrderItemRepository(prismaClientService.orderItem),
      ),
    ),
  );
