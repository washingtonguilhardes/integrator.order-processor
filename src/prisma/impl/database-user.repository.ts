import { Prisma } from '@prisma/client';
import { UserEntry } from '@src/core/users/domains';
import { UserRepository } from '@src/core/users/repositories';

export class DatabaseUserRepository implements UserRepository {
  constructor(private readonly orderUserRepository: Prisma.OrderUserDelegate) {}

  async save(entry: UserEntry): Promise<number> {
    await this.orderUserRepository.upsert({
      create: { user_id: entry.user_id, name: entry.user_name },
      update: { name: entry.user_name },
      where: { user_id: entry.user_id },
    });
    return entry.user_id;
  }
}
