import { UserEntry } from './user-entry.domain';

export interface UserEntryBulkUpsert {
  execute(users: IterableIterator<UserEntry>): Promise<Set<number>>;
}
