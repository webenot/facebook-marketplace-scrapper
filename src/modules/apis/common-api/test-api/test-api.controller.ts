import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseResponseDto } from '~/modules/utils/dto/base-response.dto';
import { ResponseMessagesEnum } from '~/modules/utils/enums';

import { TestApiService } from './test-api.service';

@Controller('common/test-api')
@ApiTags('Common test api')
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: ResponseMessagesEnum.SOMETHING_WENT_WRONG,
})
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: ResponseMessagesEnum.BAD_REQUEST })
export class TestApiController {
  constructor(private readonly testApiService: TestApiService) {}

  @Get()
  @ApiOperation({ summary: 'Test logger' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: BaseResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    schema: {
      oneOf: [
        {
          description: ResponseMessagesEnum.CONFLICT,
        },
        {
          description: ResponseMessagesEnum.SOMETHING_WENT_WRONG,
        },
      ],
    },
  })
  public testLogger(): BaseResponseDto {
    this.testApiService.testLogger();
    return {
      message: 'Testing logger',
    };
  }
}
