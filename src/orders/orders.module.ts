import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import { BulkOrderItemEntryUpsert } from '@src/core/order-items/domains';
import { OrderItemRepository } from '@src/core/order-items/repositories';
import {
  BulkOrderItemEntryUpsertUseCase,
  PushOrderItemEntryToStoreUsecase,
} from '@src/core/order-items/usecases';
import {
  BulkOrderEntryUpsert,
  LineDataExtractorStrategy,
  OrderRepository,
  ProcessLegacyOrderFile,
} from '@src/core/orders/domains';
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
import { BulkUserEntryUpsert } from '@src/core/users/domains';
import { UserRepository, UserWithOrdersRepository } from '@src/core/users/repositories';
import {
  BulkUserEntryUpsertUseCase,
  FetchUsersWithOrdersUseCase,
  PushUserEntryToStoreUseCase,
} from '@src/core/users/usecases';
import { PrismaModule } from '@src/prisma/prisma.module';
import { memoryStorage } from 'multer';
import {
  GetAllUsersWithOrders,
  GetAllUsersWithOrdersImpl,
  SyncOrder,
  SyncOrderService,
} from './domains';
import { OrdersController } from './orders.controller';

@Module({
  controllers: [OrdersController],
  providers: [
    {
      provide: ProcessLegacyOrderFile,
      useFactory: () => {
        const extractStrategies: [
          LegacyOrderFields,
          LineDataExtractorStrategy<unknown>,
        ][] = [
          [LegacyOrderFields.USER_ID, new OrderIdentityExtractorStrategy([0, 10])],
          [LegacyOrderFields.USER_NAME, new OrderWordExtractorStrategy([10, 55])],
          [LegacyOrderFields.ORDER_ID, new OrderIdentityExtractorStrategy([55, 65])],
          [LegacyOrderFields.PRODUCT_ID, new OrderIdentityExtractorStrategy([65, 75])],
          [LegacyOrderFields.PRODUCT_PRICE, new OrderNumberExtractorStrategy([75, 87])],
          [LegacyOrderFields.ORDER_DATE, new OrderDateExtractorStrategy([87, 95])],
        ];
        return new ProcessLegacyOrderFileUsecase(
          new OrderEntryLineProcessorForLegacyEntryUseCase(
            new OrderLineExtractorAdapterUseCase(...extractStrategies),
          ),
        );
      },
    },
    {
      provide: BulkUserEntryUpsert,
      useFactory: (repo: UserRepository) =>
        new BulkUserEntryUpsertUseCase(new PushUserEntryToStoreUseCase(repo)),
      inject: [UserRepository],
    },
    {
      provide: BulkOrderEntryUpsert,
      useFactory: (orderRepository: OrderRepository) =>
        new BulkOrderEntryUpsertUseCase(
          new PushOrderEntryToStoreUseCase(orderRepository),
          new OrderTotalCalculateUseCase(),
        ),
      inject: [OrderRepository],
    },
    {
      provide: BulkOrderItemEntryUpsert,
      useFactory: (repo: OrderItemRepository) =>
        new BulkOrderItemEntryUpsertUseCase(new PushOrderItemEntryToStoreUsecase(repo)),
      inject: [OrderItemRepository],
    },
    {
      provide: SyncOrder,
      useFactory: (
        processLegacyOrderFile: ProcessLegacyOrderFile,
        bulkUserEntryUpsert: BulkUserEntryUpsert,
        bulkOrderEntryUpsert: BulkOrderEntryUpsert,
        bulkOrderItemEntryUpsert: BulkOrderItemEntryUpsert,
      ) =>
        new SyncOrderService(
          processLegacyOrderFile,
          bulkUserEntryUpsert,
          bulkOrderEntryUpsert,
          bulkOrderItemEntryUpsert,
        ),
      inject: [
        ProcessLegacyOrderFile,
        BulkUserEntryUpsert,
        BulkOrderEntryUpsert,
        BulkOrderItemEntryUpsert,
      ],
    },

    {
      provide: GetAllUsersWithOrders,
      useFactory: (userWithOrdersRepository: UserWithOrdersRepository) =>
        new GetAllUsersWithOrdersImpl(
          new FetchUsersWithOrdersUseCase(userWithOrdersRepository),
        ),
      inject: [UserWithOrdersRepository],
    },
  ],
  imports: [
    PrismaModule.Repositories(),
    MulterModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        dest: configService.get('FILE_BUCKET_NAME'),
        storage: memoryStorage(),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class OrdersModule {}
