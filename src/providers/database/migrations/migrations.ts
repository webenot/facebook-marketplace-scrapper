// For typeORM v0.3 we need to use migration classes in datasource configuration
// Import migrations here and export them in array
import { AddProductItemsTable1693583304949 } from './1693583304949-AddProductItemsTable';

export const migrations = [AddProductItemsTable1693583304949];
