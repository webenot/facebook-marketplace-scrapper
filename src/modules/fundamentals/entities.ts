// For typeORM v0.3 we need to use entity in datasource configuration
// Import entities here and export them in array
import { ProductItem } from '~/modules/fundamentals/product-items/product-item.entity';

export const entities = [ProductItem];
