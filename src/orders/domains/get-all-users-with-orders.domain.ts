import { UserEntryWithOrders } from '@src/core/users/domains';

export interface GetAllUsersWithOrders {
  execute(): Promise<UserEntryWithOrders[]>;
}
export const GetAllUsersWithOrdersKey = Symbol('GetAllUsersWithOrders');
