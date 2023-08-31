import { AmqpConnection, AmqpConnectionManager, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';

import { ConfigurationService } from '~/modules/configurations/configuration.service';

import { RmqConnectionsEnum } from './enums';
import { RmqService } from './rmq.service';

const configurationService = new ConfigurationService();
const rabbitMQOptions = configurationService.getRabbitMQConfiguration();

@Module({
  imports: [RabbitMQModule.forRoot(RabbitMQModule, { ...rabbitMQOptions })],
  exports: [RmqService],
  providers: [
    RmqService,
    {
      provide: AmqpConnection,
      useFactory: async (amqpConnectionManager: AmqpConnectionManager): Promise<AmqpConnection | undefined> => {
        return amqpConnectionManager.getConnection(RmqConnectionsEnum.MAIN_CONNECTION);
      },
      inject: [AmqpConnectionManager],
    },
  ],
})
export class RmqModule {}
