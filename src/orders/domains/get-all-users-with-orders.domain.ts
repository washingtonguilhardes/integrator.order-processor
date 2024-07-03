import { UserEntryWithOrders } from '@src/core/users/domains';
import { UserWithOrdersFilter } from '@src/core/users/repositories';

export interface GetAllUsersWithOrders {
  execute(filter?: UserWithOrdersFilter): Promise<UserEntryWithOrders[]>;
}
export const GetAllUsersWithOrdersKey = Symbol('GetAllUsersWithOrders');
