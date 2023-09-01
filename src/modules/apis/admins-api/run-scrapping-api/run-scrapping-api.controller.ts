import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RunFbScrappingRequestDto } from '~/modules/apis/admins-api/run-scrapping-api/dtos';
import { BaseResponseDto } from '~/modules/utils/dto/base-response.dto';
import { ResponseMessagesEnum } from '~/modules/utils/enums';

import { AdminRunScrappingApiService } from './run-scrapping-api.service';

@Controller('admin/run-scrapping')
@ApiTags('Admins run scraping api')
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: ResponseMessagesEnum.SOMETHING_WENT_WRONG,
})
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: ResponseMessagesEnum.BAD_REQUEST })
@ApiResponse({ status: HttpStatus.FORBIDDEN, description: ResponseMessagesEnum.FORBIDDEN })
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: ResponseMessagesEnum.UNAUTHORIZED })
export class AdminRunScrappingApiController {
  constructor(private readonly runScrappingApiService: AdminRunScrappingApiService) {}

  @Post()
  @ApiOperation({ summary: 'Run page scrapping' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: BaseResponseDto,
    isArray: true,
  })
  async runScraping(@Body() payload: RunFbScrappingRequestDto): Promise<BaseResponseDto> {
    this.runScrappingApiService.runScraping(payload);
    return {
      message: 'Scraping started',
    };
  }
}
