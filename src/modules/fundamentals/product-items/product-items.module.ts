import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductItem } from '~/modules/fundamentals/product-items/product-item.entity';

import { ProductItemsService } from './product-items.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductItem])],
  providers: [ProductItemsService],
  exports: [ProductItemsService],
})
export class ProductItemsModule {}
