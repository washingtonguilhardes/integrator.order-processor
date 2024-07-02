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
  ProcessLegacyOrderFileUsecase,
  PushOrderEntryToStoreUseCase,
} from '@src/core/orders/usecases';

import { OrderTotalCalculateUseCase } from '@src/core/orders/usecases/order-total-calculate.usecase';
import {
  PushUserEntryToStoreUseCase,
  UserEntryBulkUpsertUseCase,
} from '@src/core/users/usecases';
import { PrismaService } from '@src/prisma/prisma.service';
import { DatabaseUserRepository } from '@src/users/impl/database-user.repository';
import { DatabaseOrderRepository } from '../impl/database-order.repository';
import { SyncOrderService } from '../services/sync-orders.service';

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
    new UserEntryBulkUpsertUseCase(
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
  );
