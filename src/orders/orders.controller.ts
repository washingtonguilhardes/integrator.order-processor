import {
  Controller,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetAllUsersWithOrders, SyncOrder } from './domains';

@Controller('/orders')
export class OrdersController {
  constructor(
    private readonly syncOrder: SyncOrder,
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
