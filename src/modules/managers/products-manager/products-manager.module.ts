import { Module } from '@nestjs/common';

import { ProductItemsModule } from '~/modules/fundamentals/product-items/product-items.module';

import { ProductsManagerService } from './products-manager.service';
import { ProductsRmqConsumer } from './products-rmq.consumer';

@Module({
  imports: [ProductItemsModule],
  providers: [ProductsManagerService, ProductsRmqConsumer],
  exports: [ProductsManagerService],
})
export class ProductsManagerModule {}
