import type { RabbitMQChannels, RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { validateSync, ValidationError } from 'class-validator';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import type { RedisOptions } from 'ioredis';
import * as path from 'path';

import { LoggerService } from '~/logger/logger.service';
import {
  RmqChannelsEnum,
  RmqConnectionsEnum,
  RmqExchangesEnum,
  RmqExchangeTypesEnum,
  RmqPrefetchCountEnum,
} from '~/providers/rmq/enums';

import { convertStringToBoolean } from '../utils/string';
import { ConfigurationDto } from './dtos/configuration.dto';
import type { IDatabaseOptions } from './types';

@Injectable()
export class ConfigurationService {
  private readonly logger = new LoggerService('CONFIGURATION');
  private readonly configuration: ConfigurationDto;

  constructor() {
    const configuration = new ConfigurationDto();

    Object.assign(configuration, { ...ConfigurationService.getDotenvConfiguration(), ...process.env });
    const validationResult = validateSync(configuration, { whitelist: true });

    if (validationResult && validationResult.length > 0) {
      this.logger.error(
        'Configuration invalid',
        `Validation errors:\n${this.extractValidationErrorMessages(validationResult)}`
      );
      throw new Error(`Configuration invalid\n${validationResult}`);
    }

    this.configuration = configuration;
  }

  private static getRMQChannels(): RabbitMQChannels {
    return {
      [RmqChannelsEnum.CHANNEL_1]: {
        prefetchCount: RmqPrefetchCountEnum.ONE,
        default: true,
      },
      [RmqChannelsEnum.CHANNEL_2]: {
        prefetchCount: RmqPrefetchCountEnum.ONE,
      },
    };
  }

  private static getDotenvConfiguration(): Record<string, string | null> {
    const ENV_PATH = path.resolve(process.cwd(), '.env');
    return fs.existsSync(ENV_PATH) ? dotenv.parse(fs.readFileSync(ENV_PATH)) : {};
  }

  public get<K extends keyof ConfigurationDto>(key: K): ConfigurationDto[K] {
    if (this.configuration[key] && !(this.configuration[key] === 'null')) {
      return this.configuration[key];
    }
    throw new Error(`Environment variable ${key} is null`);
  }

  public getDBConfiguration(): IDatabaseOptions {
    return {
      host: this.get('DB_HOST'),
      port: +this.get('DB_PORT'),
      username: this.get('DB_USERNAME'),
      password: this.get('DB_PASSWORD'),
      database: this.get('DB_NAME'),
      logging: convertStringToBoolean(this.get('DB_LOGGING')),
    };
  }

  public getRedisConfigurations(): RedisOptions {
    return {
      host: this.get('REDIS_HOST'),
      port: +this.get('REDIS_PORT'),
      username: this.get('REDIS_USER'),
      password: this.get('REDIS_PASSWORD'),
    };
  }

  public getRabbitMQConfiguration(): RabbitMQConfig {
    return {
      uri: this.get('RMQ_CONNECT_STRING'),
      channels: ConfigurationService.getRMQChannels(),
      exchanges: [
        {
          name: RmqExchangesEnum.TEST_EXCHANGE,
          type: RmqExchangeTypesEnum.TOPIC,
        },
        {
          name: RmqExchangesEnum.SCRAPING_EXCHANGE,
          type: RmqExchangeTypesEnum.TOPIC,
        },
        {
          name: RmqExchangesEnum.PRODUCTS_EXCHANGE,
          type: RmqExchangeTypesEnum.TOPIC,
        },
      ],
      enableControllerDiscovery: convertStringToBoolean(this.get('IS_RMQ_CONTROLLER_DISCOVERY') || 'true'),
      connectionInitOptions: {
        wait: convertStringToBoolean(this.get('IS_RMQ_CONNECTION_WAIT') || 'false'),
      },
      name: RmqConnectionsEnum.MAIN_CONNECTION,
    };
  }

  private extractValidationErrorMessages(validationErrors: ValidationError[]): string {
    return validationErrors
      .map((validationError) => ` ${Object.values(validationError.constraints || {})},`)
      .join('\n');
  }
}
