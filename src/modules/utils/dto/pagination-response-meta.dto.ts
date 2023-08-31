import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import type { IPaginationMeta } from '../types';

export class PaginationResponseMetaDto implements IPaginationMeta {
  @ApiProperty({
    description: 'The amount of items on this specific page',
    type: 'number',
  })
  itemCount: number;

  @ApiPropertyOptional({
    description: 'The total amount of items',
    type: 'number',
  })
  totalItems?: number;

  @ApiProperty({
    description: 'The amount of items that were requested per page',
    type: 'number',
  })
  itemsPerPage: number;

  @ApiPropertyOptional({
    description: 'The total amount of pages in this paginator',
    type: 'number',
  })
  totalPages?: number;

  @ApiProperty({
    description: 'The current page this paginator "points" to',
    type: 'number',
  })
  currentPage: number;
}
