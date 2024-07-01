import { PrismaClient } from '@prisma/client';
import { UserEntry } from '@src/core/users/domains';
import { UserRepository } from '@src/core/users/repositories';

export class DatabaseUserRepository implements UserRepository {
  constructor(private readonly orderRepository: PrismaClient['orderUser']) {}

  private static mapToEntry(user: { user_id: number; name: string }): UserEntry {
    return {
      user_id: user.user_id,
      user_name: user.name,
    };
  }

  async getById(id: number): Promise<UserEntry> {
    const user = await this.orderRepository.findFirstOrThrow({ where: { user_id: id } });
    return DatabaseUserRepository.mapToEntry(user);
  }

  async getAll(): Promise<UserEntry[]> {
    return (await this.orderRepository.findMany()).map(DatabaseUserRepository.mapToEntry);
  }

  async create(entry: UserEntry): Promise<number> {
    await this.orderRepository.create({
      data: { user_id: entry.user_id, name: entry.user_name },
    });
    return entry.user_id;
  }

  async update(entry: Partial<UserEntry>): Promise<void> {
    const { user_id } = entry;
    const curretnUser = await this.getById(user_id);
    if (entry.user_name) {
      curretnUser.user_name = entry.user_name;
    }
    await this.orderRepository.update({
      where: { user_id },
      data: curretnUser,
    });
  }
}
