import { Prisma } from '@prisma/client';
import { UserEntry } from '@src/core/users/domains';
import { UserRepository } from '@src/core/users/repositories';

export class DatabaseUserRepository implements UserRepository {
  constructor(private readonly orderUserRepository: Prisma.OrderUserDelegate) {}

  private static mapToEntry(user: { user_id: number; name: string }): UserEntry {
    return {
      user_id: user.user_id,
      user_name: user.name,
    };
  }

  async getById(id: number): Promise<UserEntry> {
    const user = await this.orderUserRepository.findFirstOrThrow({
      where: { user_id: id },
    });
    return DatabaseUserRepository.mapToEntry(user);
  }

  async getAll(): Promise<UserEntry[]> {
    return (await this.orderUserRepository.findMany()).map(
      DatabaseUserRepository.mapToEntry,
    );
  }

  async create(entry: UserEntry): Promise<number> {
    await this.orderUserRepository.upsert({
      create: { user_id: entry.user_id, name: entry.user_name },
      update: { name: entry.user_name },
      where: { user_id: entry.user_id },
    });
    return entry.user_id;
  }

  async update(entry: Partial<UserEntry>): Promise<void> {
    const { user_id } = entry;
    const curretnUser = await this.getById(user_id);
    if (entry.user_name) {
      curretnUser.user_name = entry.user_name;
    }
    await this.orderUserRepository.update({
      where: { user_id },
      data: curretnUser,
    });
  }
}
