import { PushUserEntryToStore, UserEntry } from '../domains';
import { UserRepository } from '../repositories';

export class PushUserEntryToStoreUseCase implements PushUserEntryToStore {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(entry: UserEntry): Promise<number> {
    return await this.userRepo.create(entry);
  }
}
