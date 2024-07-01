import {
  Controller,
  HttpStatus,
  Inject,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SyncOrder } from './domains/sync-orders.domain';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(SyncOrder)
    private readonly syncOrder: SyncOrder,
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
    console.log(file);
    await this.syncOrder.execute(file.buffer);
  }

  // @Get()
  // findAll() {
  //   return this.ordersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.ordersService.findOne(+id);
  // }
}
