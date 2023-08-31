import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { Pagination } from '../classes';

export const ApiPaginatedResponse = <TModel extends Type>(model: TModel): ReturnType<typeof applyDecorators> => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiExtraModels(Pagination),
    ApiOkResponse({
      description: 'Successfully received list',
      schema: {
        allOf: [
          { $ref: getSchemaPath(Pagination) },
          {
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    })
  );
};
