import { ApiPropertyOptional } from '@nestjs/swagger';

import type { IPaginationLinks } from '../types';

export class PaginationLinksResponseDto implements IPaginationLinks {
  @ApiPropertyOptional({
    description: 'A link to the "first" page',
    type: 'string',
  })
  first?: string;

  @ApiPropertyOptional({
    description: 'A link to the "previous" page',
    type: 'string',
  })
  previous?: string;

  @ApiPropertyOptional({
    description: 'A link to the "next" page',
    type: 'string',
  })
  next?: string;

  @ApiPropertyOptional({
    description: 'A link to the "last" page',
    type: 'string',
  })
  last?: string;
}
