import { Module } from '@nestjs/common';

import { ConfigurationModule } from '~/modules/configurations/configuration.module';
import { RmqModule } from '~/providers/rmq/rmq.module';

import { AdminRunScrappingApiController } from './run-scrapping-api.controller';
import { AdminRunScrappingApiService } from './run-scrapping-api.service';

@Module({
  imports: [RmqModule, ConfigurationModule],
  controllers: [AdminRunScrappingApiController],
  providers: [AdminRunScrappingApiService],
})
export class RunScrappingApiModule {}
