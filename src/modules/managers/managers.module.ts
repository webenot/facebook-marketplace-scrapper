import { Module } from '@nestjs/common';

import { CronManagerModule } from './cron-manager/cron-manager.module';
import { LaunchScrapingManagerModule } from './launch-scraping-manager/launch-scraping-manager.module';
import { ProductsManagerModule } from './products-manager/products-manager.module';

const modules = [CronManagerModule, LaunchScrapingManagerModule, ProductsManagerModule];

@Module({
  imports: modules,
  exports: modules,
})
export class ManagersModule {}
