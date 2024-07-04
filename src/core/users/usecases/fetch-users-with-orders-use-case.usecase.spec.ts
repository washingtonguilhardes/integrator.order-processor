import { UserEntryWithOrders } from '../domains';
import { UserWithOrdersRepository } from '../repositories';
import { FetchUsersWithOrdersUseCase } from './fetch-users-with-orders-use-case.usecase';

describe('FetchUsersWithOrdersUseCase', () => {
  let usecase: FetchUsersWithOrdersUseCase;
  let repository: UserWithOrdersRepository;

  beforeEach(() => {
    repository = { getAll: jest.fn(), count: jest.fn() } as UserWithOrdersRepository;
    usecase = new FetchUsersWithOrdersUseCase(repository);
  });

  it('should fetch users with orders correctly', async () => {
    const expectedEntries: UserEntryWithOrders[] = [
      {
        user_id: 1,
        name: 'user1',
        orders: [
          {
            order_id: 1,
            date: new Date(),
            total: 10,
            products: [
              {
                product_id: 1,
                value: 10,
              },
            ],
          },
          {
            order_id: 2,
            date: new Date(),
            total: 10,
            products: [
              {
                product_id: 1,
                value: 10,
              },
            ],
          },
        ],
      },
    ];

    jest
      .spyOn(repository, 'getAll')
      .mockResolvedValueOnce({ entries: expectedEntries, pageSize: 1, total: 1 });

    const result = await usecase.execute({});

    expect(result).toEqual(expectedEntries);
    expect(repository.getAll).toHaveBeenCalledWith({});
  });
});
