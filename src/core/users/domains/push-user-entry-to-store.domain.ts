import { UserRepository } from '../repositories';
import { UserEntry } from './user-entry.domain';

export abstract class PushUserEntryToStore {
  constructor(protected readonly userRepo: UserRepository) {}

  abstract execute(entry: UserEntry): Promise<number>;
}
