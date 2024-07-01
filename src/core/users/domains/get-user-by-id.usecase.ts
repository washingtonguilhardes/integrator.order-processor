import { UserEntry } from './user-entry.domain';

export interface GetUserByIdUsecase {
  execute(userId: number): Promise<UserEntry>;
}
