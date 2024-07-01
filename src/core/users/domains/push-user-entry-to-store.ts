import { UserEntry } from './user-entry.domain';

export interface PushUserEntryToStore {
  execute(entry: UserEntry): Promise<number>;
}
