import { BulkUserEntryUpsert, UserEntry } from '../domains';

export class BulkUserEntryUpsertUseCase
  extends BulkUserEntryUpsert
  implements BulkUserEntryUpsert
{
  async execute(users: IterableIterator<UserEntry>): Promise<Set<number>> {
    const result = new Set<number>();
    for (const user of users) {
      await this.pushUserEntryToStore.execute(user);
      result.add(user.user_id);
    }
    return result;
  }
}
