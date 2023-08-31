import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { PaginationLinksResponseDto } from '../dto/pagination-links-response.dto';
import { PaginationResponseMetaDto } from '../dto/pagination-response-meta.dto';

export class Pagination<PaginationObject> {
  readonly items: PaginationObject[];

  @ApiProperty()
  readonly meta: PaginationResponseMetaDto;

  @ApiPropertyOptional()
  readonly links?: PaginationLinksResponseDto;
}
