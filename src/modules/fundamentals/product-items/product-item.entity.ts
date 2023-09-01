import { Column, Entity } from 'typeorm';

import { BaseEntity } from '~/modules/fundamentals/base/base.entity';
import { DatabaseTablesEnum } from '~/providers/database/postgresql/base-service/enums';

@Entity({ name: DatabaseTablesEnum.PRODUCT_ITEMS })
export class ProductItem extends BaseEntity {
  @Column()
  title: string;

  @Column()
  price: string;

  @Column()
  location: string;

  @Column()
  imageUrl: string;

  @Column()
  link: string;

  @Column()
  fbId: string;
}
