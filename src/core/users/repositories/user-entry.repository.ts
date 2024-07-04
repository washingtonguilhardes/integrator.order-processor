import { UserEntry } from '../domains';

export abstract class UserRepository {
  abstract save(entry: Partial<UserEntry>): Promise<number>;
}
