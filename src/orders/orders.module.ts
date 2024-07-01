import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import {
  OrderEntryLineProcessorForLegacyEntryUseCase,
  OrderLineExtractorAdapterUseCase,
  ProcessLegacyOrderFileUsecase,
} from '@src/core/orders/usecases';

import { memoryStorage } from 'multer';
import { SyncOrder } from './domains/sync-orders.domain';
import { OrdersController } from './orders.controller';
import { SyncOrderService } from './services/sync-orders.service';

@Module({
  controllers: [OrdersController],
  providers: [
    {
      provide: SyncOrder,
      useFactory: () => {
        return new SyncOrderService(
          new ProcessLegacyOrderFileUsecase(
            new OrderEntryLineProcessorForLegacyEntryUseCase(
              new OrderLineExtractorAdapterUseCase(),
            ),
          ),
        );
      },
    },
  ],
  imports: [
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
