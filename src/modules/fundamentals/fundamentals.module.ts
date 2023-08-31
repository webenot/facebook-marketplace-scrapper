import { Module } from '@nestjs/common';

import { ClientsModule } from './clients/clients.module';
import { UsersModule } from './users/users.module';

const modules = [UsersModule, ClientsModule];

@Module({
  imports: modules,
  exports: modules,
})
export class FundamentalsModule {}
