import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    jest.spyOn(prismaService, '$connect').mockResolvedValue(undefined);
    jest.spyOn(prismaService, '$disconnect').mockResolvedValue(undefined);
  });

  afterEach(async () => {
    await prismaService.$disconnect();
  });

  it('should connect to the database on module initialization', async () => {
    const connectSpy = jest.spyOn(prismaService, '$connect');

    await prismaService.onModuleInit();

    expect(connectSpy).toHaveBeenCalled();
  });
});
