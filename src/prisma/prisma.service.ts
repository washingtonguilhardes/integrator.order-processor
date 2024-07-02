import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect();
  }

  getOrderItemRepo(): Prisma.OrderUserDelegate {
    return this.orderUser;
  }
}
