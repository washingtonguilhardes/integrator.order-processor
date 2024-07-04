import { DynamicModule, Module, Provider } from '@nestjs/common';
import { OrderItemRepository } from '@src/core/order-items/repositories';
import { OrderRepository } from '@src/core/orders/domains';
import { UserRepository, UserWithOrdersRepository } from '@src/core/users/repositories';
import {
  DatabaseOrderItemRepositoryImpl,
  DatabaseOrderRepositoryImpl,
  DatabaseUserRepository,
} from './impl';
import { DatabaseUserWithOrdersRepositoryImpl } from './impl/database-user-with-orders.impl';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {
  static Repositories(): DynamicModule {
    const repositories: Provider[] = [
      PrismaService,
      {
        provide: UserRepository,
        useFactory: (prismaService: PrismaService) =>
          new DatabaseUserRepository(prismaService.orderUser),
        inject: [PrismaService],
      },
      {
        provide: OrderItemRepository,
        useFactory: (prismaService: PrismaService) =>
          new DatabaseOrderItemRepositoryImpl(prismaService.orderItem),
        inject: [PrismaService],
      },
      {
        provide: OrderRepository,
        useFactory: (prismaService: PrismaService) =>
          new DatabaseOrderRepositoryImpl(prismaService.order),
        inject: [PrismaService],
      },
      {
        provide: UserWithOrdersRepository,
        useFactory: (prismaService: PrismaService) =>
          new DatabaseUserWithOrdersRepositoryImpl(
            prismaService.orderUser,
            prismaService.order,
          ),
        inject: [PrismaService],
      },
    ];
    return {
      module: PrismaModule,
      providers: repositories,
      exports: repositories,
      global: true,
    };
  }
}
