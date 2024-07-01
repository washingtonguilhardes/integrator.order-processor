import { UserEntry } from '../../core/users/domains';

export class User implements UserEntry {
  user_id: number;

  user_name: string;
}
