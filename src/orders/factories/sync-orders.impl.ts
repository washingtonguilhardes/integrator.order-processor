import { LegacyOrderFields } from '@src/core/orders/enums';
import { OrderDateExtractorStrategy } from '@src/core/orders/strategies/order-date-extractor.strategy';
import { OrderIdentityExtractorStrategy } from '@src/core/orders/strategies/order-identity-extractor.strategy';
import { OrderNumberExtractorStrategy } from '@src/core/orders/strategies/order-number-extractor.strategy';
import { OrderWordExtractorStrategy } from '@src/core/orders/strategies/order-word-extractor.strategy';
import {
  OrderEntryLineProcessorForLegacyEntryUseCase,
  OrderLineExtractorAdapterUseCase,
  ProcessLegacyOrderFileUsecase,
} from '@src/core/orders/usecases';
import { SyncOrderService } from '../services/sync-orders.service';

export const syncOrderFactory = () =>
  new SyncOrderService(
    new ProcessLegacyOrderFileUsecase(
      new OrderEntryLineProcessorForLegacyEntryUseCase(
        new OrderLineExtractorAdapterUseCase(
          [LegacyOrderFields.USER_ID, new OrderIdentityExtractorStrategy([0, 10])],
          [LegacyOrderFields.USER_NAME, new OrderWordExtractorStrategy([10, 55])],
          [LegacyOrderFields.ORDER_ID, new OrderIdentityExtractorStrategy([55, 65])],
          [LegacyOrderFields.PRODUCT_ID, new OrderIdentityExtractorStrategy([65, 75])],
          [LegacyOrderFields.PRODUCT_PRICE, new OrderNumberExtractorStrategy([75, 87])],
          [LegacyOrderFields.ORDER_DATE, new OrderDateExtractorStrategy([87, 95])],
        ),
      ),
    ),
  );
