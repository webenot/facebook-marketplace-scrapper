import { PAGINATION_DEFAULT_LIMIT } from './constants';
import type { PaginationParametersRequestDto } from './dto/pagination-parameters-request.dto';

export const preparePaginateFilters = (
  filters: PaginationParametersRequestDto
): { limit: number; offset: number; page: number } => {
  const limit = Number(filters.limit || PAGINATION_DEFAULT_LIMIT);
  const page = Number(filters.page || 1);
  const offset = (page - 1) * limit;

  return {
    limit,
    offset,
    page,
  };
};
