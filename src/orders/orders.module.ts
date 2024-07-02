import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import { PrismaModule } from '@src/prisma/prisma.module';
import { PrismaService } from '@src/prisma/prisma.service';
import { memoryStorage } from 'multer';
import { syncOrderFactory } from './domains/impl';
import { SyncOrderServiceKey } from './domains/sync-orders.domain';
import { OrdersController } from './orders.controller';

@Module({
  controllers: [OrdersController],
  providers: [
    {
      provide: SyncOrderServiceKey,
      useFactory: syncOrderFactory,
      inject: [PrismaService],
    },
  ],
  imports: [
    PrismaModule,
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
