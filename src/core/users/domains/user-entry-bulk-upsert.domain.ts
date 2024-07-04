import { PushUserEntryToStore } from './push-user-entry-to-store.domain';
import { UserEntry } from './user-entry.domain';

export abstract class BulkUserEntryUpsert {
  constructor(protected readonly pushUserEntryToStore: PushUserEntryToStore) {}

  abstract execute(users: IterableIterator<UserEntry>): Promise<Set<number>>;
}
export const BulkUserEntryUpsertKey = Symbol('BulkUserEntryUpsert');
