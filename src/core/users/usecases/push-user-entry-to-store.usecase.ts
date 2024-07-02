import { PushUserEntryToStore, UserEntry } from '../domains';
import { UserRepository } from '../repositories';

export class PushUserEntryToStoreUseCase implements PushUserEntryToStore {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(entry: UserEntry): Promise<number> {
    await this.userRepo.save(entry);
    return entry.user_id;
  }
}
