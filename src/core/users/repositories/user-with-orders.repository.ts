import { PaginatedRepository } from '@src/core/shared/repositories';
import { UserEntryWithOrders } from '../domains';

export interface UserWithOrdersFilter {
  readonly orderId?: number;
  readonly interval?: { readonly start?: string; readonly end?: string };
}

export interface UserWithOrdersRepository
  extends PaginatedRepository<UserEntryWithOrders, UserWithOrdersFilter> {}
