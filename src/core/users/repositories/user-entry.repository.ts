import { UserEntry } from '../domains';

export interface UserRepository {
  save(entry: Partial<UserEntry>): Promise<number>;
}
