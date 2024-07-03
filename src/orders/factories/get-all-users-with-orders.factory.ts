import { FetchUsersWithOrdersUseCase } from '@src/core/users/usecases';
import { UserWithOrdersRepositoryImpl } from '@src/prisma/impl/database-user-with-orders.impl';
import { PrismaService } from '@src/prisma/prisma.service';
import { GetAllUsersWithOrdersImpl } from '../domains';

export const getAllUsersWithOrdersFactory = (prismaClientService: PrismaService) => {
  return new GetAllUsersWithOrdersImpl(
    new FetchUsersWithOrdersUseCase(
      new UserWithOrdersRepositoryImpl(
        prismaClientService.orderUser,
        prismaClientService.order,
      ),
    ),
  );
};
