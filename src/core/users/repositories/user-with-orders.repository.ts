import { PaginatedRepository, PaginatedResponse } from '@src/core/shared/repositories';
import { UserEntryWithOrders } from '../domains';

export interface UserWithOrdersFilter {
  readonly orderId?: number;
  readonly interval?: { readonly start?: string; readonly end?: string };
}

export abstract class UserWithOrdersRepository
  implements PaginatedRepository<UserEntryWithOrders, UserWithOrdersFilter>
{
  abstract getAll(
    filter?: UserWithOrdersFilter,
  ): Promise<PaginatedResponse<UserEntryWithOrders>>;

  abstract count(): Promise<number>;
}
