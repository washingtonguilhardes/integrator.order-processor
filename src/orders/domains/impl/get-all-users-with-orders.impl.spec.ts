import { FetchUsersWithOrders, UserEntryWithOrders } from '@src/core/users/domains';
import { GetAllUsersWithOrdersImpl } from './get-all-users-with-orders.impl';

describe('GetAllUsersWithOrdersImpl', () => {
  let fetchUsersWithOrders: jest.Mocked<FetchUsersWithOrders>;
  let getAllUsersWithOrdersImpl: GetAllUsersWithOrdersImpl;

  beforeEach(() => {
    fetchUsersWithOrders = {
      execute: jest.fn().mockResolvedValue([]),
    } as any;
    getAllUsersWithOrdersImpl = new GetAllUsersWithOrdersImpl(fetchUsersWithOrders);
  });

  describe('execute', () => {
    it('should call fetchUsersWithOrders.execute', async () => {
      await getAllUsersWithOrdersImpl.execute();
      expect(fetchUsersWithOrders.execute).toHaveBeenCalled();
    });

    it('should return an array of UserEntryWithOrders', async () => {
      const usersWithOrders: UserEntryWithOrders[] = [
        {
          orders: [
            {
              date: new Date(),
              order_id: 1,
              total: 10,
              products: [{ value: 10, product_id: 1 }],
            },
          ],
          user_id: 1,
          name: 'user1',
        },
      ];
      fetchUsersWithOrders.execute.mockResolvedValue(usersWithOrders);

      const result = await getAllUsersWithOrdersImpl.execute();
      expect(result).toEqual(usersWithOrders);
    });
  });
});
