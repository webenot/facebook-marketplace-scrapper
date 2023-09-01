import { Module } from '@nestjs/common';

import { CronManagerModule } from './cron-manager/cron-manager.module';
import { LaunchScrapingManagerModule } from './launch-scraping-manager/launch-scraping-manager.module';

const modules = [CronManagerModule, LaunchScrapingManagerModule];

@Module({
  imports: modules,
  exports: modules,
})
export class ManagersModule {}
