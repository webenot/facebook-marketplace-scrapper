import type { Provider } from '@nestjs/common';

import { BaseConsumerService } from './base-consumer.service';
import Mock = jest.Mock;

const baseConsumerServiceMockFactory: Mock<Partial<BaseConsumerService>> = jest.fn(() => ({
  onQueueActive: jest.fn(),
  onQueueCompleted: jest.fn(),
  onQueueFailed: jest.fn(),
}));

export const BaseConsumerServiceMock: Provider = {
  provide: BaseConsumerService,
  useFactory: baseConsumerServiceMockFactory,
};
