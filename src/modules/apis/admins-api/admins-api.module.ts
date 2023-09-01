import { Module } from '@nestjs/common';

import { RunScrappingApiModule } from './run-scrapping-api/run-scrapping-api.module';
import { TestApiModule } from './test-api/test-api.module';

const modules = [TestApiModule, RunScrappingApiModule];

@Module({
  imports: modules,
  exports: modules,
})
export class AdminsApiModule {}
