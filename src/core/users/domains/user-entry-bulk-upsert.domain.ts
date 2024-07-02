import { UserEntry } from './user-entry.domain';

export interface BulkUserEntryUpsert {
  execute(users: IterableIterator<UserEntry>): Promise<Set<number>>;
}
