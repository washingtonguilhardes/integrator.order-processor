import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import * as request from 'supertest';
import { PrismaService } from '../prisma/prisma.service';
import { expectedResult } from './expected-result';

const tableMock = () => {
  const store = [];
  return {
    store,
    upsert: jest.fn().mockImplementation(data => {
      store.push(data);
    }),
    findMany: jest.fn().mockImplementation(() => store),
    findUnique: jest.fn().mockImplementation(id => store.find(item => item.id === id)),
    findFirst: jest.fn().mockImplementation(() => null),
    create: jest.fn().mockImplementation(data => store.push(data)),
  };
};
describe('OrdersController (e2e)', () => {
  let app: INestApplication;
  let mockPrisma = {
    orderUser: tableMock(),
    order: tableMock(),
    orderItem: tableMock(),
  };
  beforeEach(async () => {
    mockPrisma = {
      orderUser: tableMock(),
      order: tableMock(),
      orderItem: tableMock(),
    };
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/orders', () => {
    it('/orders/sync-with-legacy (POST): should not accept request', () => {
      return request(app.getHttpServer())
        .post('/orders/sync-with-legacy')
        .expect(422)
        .expect({
          message: 'File is required',
          error: 'Unprocessable Entity',
          statusCode: 422,
        });
    });
    it('/orders/sync-with-legacy (POST)', () => {
      return request(app.getHttpServer())
        .post('/orders/sync-with-legacy')
        .attach(
          'file',
          Buffer.from(
            `
0000000070                              Palmer Prosacco00000007530000000003     1836.7420210308
0000000070                              Palmer Prosacco00000007530000000003     1837.7420210308
0000000075                                  Bobbie Batz00000007980000000002     1578.5720211116
0000000049                               Ken Wintheiser00000005230000000003      586.7420210903
0000000014                                 Clelia Hills00000001460000000001      673.4920211125
0000000057                          Elidia Gulgowski IV00000006200000000000     1417.2520210919
0000000080                                 Tabitha Kuhn00000008770000000003      817.1320210612
0000000023                                  Logan Lynch00000002530000000002      322.1220210523
0000000015                                   Bonny Koss00000001530000000004        80.820210701
0000000017                              Ethan Langworth00000001690000000000      865.1820210409
`.trim(),
          ),
          'test-file.txt',
        )
        .expect(HttpStatus.CREATED)
        .expect(() => {
          expect(JSON.parse(JSON.stringify(mockPrisma.order.store))).toEqual(
            expectedResult.order.store,
          );
          expect(JSON.parse(JSON.stringify(mockPrisma.orderItem.store))).toEqual(
            expectedResult.orderItem.store,
          );
          expect(JSON.parse(JSON.stringify(mockPrisma.orderUser.store))).toEqual(
            expectedResult.orderUser.store,
          );
        });
    }, 10000);
  });

  describe('/orders (GET)', () => {
    it('/orders (GET) empt', () => {
      mockPrisma.order.store = [];
      mockPrisma.orderItem.store = [];
      mockPrisma.orderUser.store = [];
      return request(app.getHttpServer())
        .get('/orders')
        .expect(HttpStatus.OK)
        .expect(res => {
          expect(res.body).toEqual([]);
        });
    }, 10000);
    it('/orders (GET) with data', () => {
      mockPrisma.order.findMany.mockReturnValue([
        {
          order_id: 753,
          date: '2021-03-08T03:00:00.000Z',
          total: 3674.48,
          user_id: 70,
          products: [{ product_id: 3, value: 1836.74 }],
        },
      ]);
      mockPrisma.orderUser.findMany.mockReturnValue([
        { user_id: 70, name: 'Palmer Prosacco' },
      ]);
      return request(app.getHttpServer())
        .get('/orders')
        .expect(HttpStatus.OK)
        .expect(res => {
          expect(res.body).toEqual([
            {
              user_id: 70,
              name: 'Palmer Prosacco',
              orders: [
                {
                  order_id: 753,
                  date: '2021-03-08T03:00:00.000Z',
                  total: 3674.48,
                  user_id: 70,
                  products: [{ product_id: 3, value: 1836.74 }],
                },
              ],
            },
          ]);
        });
    }, 10000);
  });
});
