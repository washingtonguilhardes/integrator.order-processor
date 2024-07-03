import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  ParseFilePipeBuilder,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  GetAllUsersWithOrders,
  GetAllUsersWithOrdersKey,
  SyncOrder,
  SyncOrderServiceKey,
} from './domains';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(SyncOrderServiceKey)
    private readonly syncOrder: SyncOrder,
    @Inject(GetAllUsersWithOrdersKey)
    private readonly getAllUsersWithOrders: GetAllUsersWithOrders,
  ) {}

  @Post('/sync-with-legacy')
  @UseInterceptors(FileInterceptor('file'))
  async syncWithLegacy(
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.syncOrder.execute(file.buffer);
  }

  @Get()
  getOrders(
    @Query('orderId') orderId?: string,
    @Query('startDate') start?: string,
    @Query('endDate') end?: string,
  ) {
    return this.getAllUsersWithOrders.execute({
      interval: { start, end },
      orderId: orderId ? Number(orderId) : null,
    });
  }
}
