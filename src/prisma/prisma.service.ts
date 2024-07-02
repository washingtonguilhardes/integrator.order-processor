import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect();
  }

  getOrderUserRepo(): Prisma.OrderUserDelegate {
    return this.orderUser;
  }

  getOrderRepo(): Prisma.OrderDelegate {
    return this.order;
  }
}
