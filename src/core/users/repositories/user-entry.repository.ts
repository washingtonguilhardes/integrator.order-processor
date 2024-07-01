import { UserEntry } from '../domains';

export interface UserRepository {
  getById(id: number): Promise<UserEntry>;
  getAll(): Promise<UserEntry[]>;
  create(entry: UserEntry): Promise<number>;
  update(entry: Partial<UserEntry>): Promise<void>;
}
