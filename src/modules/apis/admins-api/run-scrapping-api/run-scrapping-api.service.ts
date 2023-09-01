import { Injectable } from '@nestjs/common';

import { ConfigurationService } from '~/modules/configurations/configuration.service';
import { RmqExchangesEnum, RmqRoutesEnum } from '~/providers/rmq/enums';
import { RmqService } from '~/providers/rmq/rmq.service';

@Injectable()
export class AdminRunScrappingApiService {
  constructor(private readonly configurationService: ConfigurationService, private readonly rmqService: RmqService) {}

  public async runScraping(path: string, isList: boolean): Promise<void> {
    const url =
      this.configurationService.get('FB_BASE_URL') + this.configurationService.get('FB_MARKETPLACE_BASE_PATH') + path;
    await this.rmqService.publish(RmqExchangesEnum.SCRAPING_EXCHANGE, RmqRoutesEnum.SCRAPING_LIST, { url, isList });
  }
}
