import { PaginatedRepository } from '@src/core/shared/repositories';
import { UserEntryWithOrders } from '../domains';

export interface UserWithOrdersRepository
  extends PaginatedRepository<UserEntryWithOrders> {}
