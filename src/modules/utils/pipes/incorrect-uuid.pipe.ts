import { BadRequestException, ParseUUIDPipe } from '@nestjs/common';

export function incorrectUUIDPipe(entityName: string): ParseUUIDPipe {
  return new ParseUUIDPipe({
    version: '4',
    exceptionFactory: (): BadRequestException => new BadRequestException(`Incorrect ${entityName} uuid`),
  });
}
