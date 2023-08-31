import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';

import { BaseConsumerService } from '~/providers/bull/base-consumer.service';
import { QueueProcessesEnum } from '~/providers/bull/enums/queue-processes.enum';
import { QueueProcessorsEnum } from '~/providers/bull/enums/queue-processors.enum';

import { CronManagerService } from '../managers/cron-manager/cron-manager.service';

@Processor(QueueProcessorsEnum.TEST)
export class TestCronConsumer extends BaseConsumerService {
  constructor(private readonly cronManagerService: CronManagerService) {
    super();
  }

  @Process(QueueProcessesEnum.TEST_CRON)
  async startTestJob(job: Job<unknown>): Promise<void> {
    await this.cronManagerService.startTestJob(job);
  }
}
