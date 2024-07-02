import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await prismaService.$disconnect();
  });

  it('should connect to the database on module initialization', async () => {
    const connectSpy = jest.spyOn(prismaService, '$connect');

    await prismaService.onModuleInit();

    expect(connectSpy).toHaveBeenCalled();
  });

  it('should return order repo', async () => {
    Reflect.set(prismaService, 'orderUser', 'orderUser');

    const repo = prismaService.getOrderItemRepo();

    expect(repo).toBe('orderUser');
  });
});
