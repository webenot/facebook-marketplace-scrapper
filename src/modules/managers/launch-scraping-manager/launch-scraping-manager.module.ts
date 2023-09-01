import { Module } from '@nestjs/common';

import { ConfigurationModule } from '~/modules/configurations/configuration.module';
import { RmqModule } from '~/providers/rmq/rmq.module';

import { LaunchScrapingManagerService } from './launch-scraping-manager.service';
import { LaunchScrappingRmqConsumer } from './launch-scrapping-rmq.consumer';

@Module({
  imports: [ConfigurationModule, RmqModule],
  exports: [LaunchScrapingManagerService],
  providers: [LaunchScrapingManagerService, LaunchScrappingRmqConsumer],
})
export class LaunchScrapingManagerModule {}
