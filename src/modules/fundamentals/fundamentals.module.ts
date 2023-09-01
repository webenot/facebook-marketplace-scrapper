import { Module } from '@nestjs/common';

import { ProductItemsModule } from './product-items/product-items.module';

const modules = [ProductItemsModule];

@Module({
  imports: modules,
  exports: modules,
})
export class FundamentalsModule {}
