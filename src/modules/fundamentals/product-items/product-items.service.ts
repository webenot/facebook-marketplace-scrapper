import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '~/modules/fundamentals/base/base.service';

import { ProductItem } from './product-item.entity';

@Injectable()
export class ProductItemsService extends BaseService<ProductItem> {
  constructor(
    @InjectRepository(ProductItem)
    public override repository: Repository<ProductItem>
  ) {
    super(ProductItem, repository);
  }
}
