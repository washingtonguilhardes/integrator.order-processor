import { PushUserEntryToStore, UserEntry } from '../domains';

export class PushUserEntryToStoreUseCase
  extends PushUserEntryToStore
  implements PushUserEntryToStore
{
  async execute(entry: UserEntry): Promise<number> {
    await this.userRepo.save(entry);
    return entry.user_id;
  }
}
