import { RabbitPayload, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { chromium } from 'playwright';
import type { Page } from 'playwright-core';

import { LoggerService } from '~/logger/logger.service';
import { ConfigurationService } from '~/modules/configurations/configuration.service';
import { RmqExchangesEnum, RmqQueuesEnum, RmqRoutesEnum } from '~/providers/rmq/enums';

@Injectable()
export class LaunchScrappingRmqConsumer {
  private readonly logger: LoggerService;
  private readonly baseFbUrl: string;

  constructor(private readonly configurationService: ConfigurationService) {
    this.logger = new LoggerService(LaunchScrappingRmqConsumer.name);
    this.baseFbUrl = this.configurationService.get('FB_BASE_URL');
  }

  @RabbitSubscribe({
    exchange: RmqExchangesEnum.SCRAPING_EXCHANGE,
    routingKey: RmqRoutesEnum.SCRAPING_LIST,
    queue: RmqQueuesEnum.SCRAPING_LIST,
  })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private async scraping(@RabbitPayload() payload: { url: string; isList: boolean }): Promise<void> {
    this.logger.info(this.scraping.name, payload);

    try {
      const browser = await chromium.launch();
      this.logger.info(this.scraping.name, { browser });
      const page = await browser.newPage();
      await this.login(page);
      if (payload.isList) {
        await this.scanList(payload.url, page, '.x139jcc6 .x1uepa24 .xjp7ctv .x1iyjqo2 .x3ct3a4 > a.x1lku1pv');
      }
      await browser.close();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      this.logger.error(this.scraping.name, error);
    }
  }

  private async login(page: Page): Promise<void> {
    const loginUrl = this.baseFbUrl + '/login';
    await page.goto(loginUrl);
    await page.waitForSelector('#email');
    await page.locator('#email').fill(this.configurationService.get('FB_USER_NAME'), { timeout: 100 });
    await page.locator('#pass').fill(this.configurationService.get('FB_USER_PASS'), { timeout: 200 });
    await page.locator('#loginbutton').click();
  }

  private async scanList(url: string, page: Page, selector: string, pages = 10): Promise<void> {
    await page.goto(url);
    await page.waitForSelector(selector);
    for (let i = 0; i < pages; i++) {
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight);');
      await this.sleep(5000);
    }
    const locators = page.locator(selector);
    this.logger.info(this.scanList.name, { locators });
    const elCount = await locators.count();
    this.logger.info(this.scanList.name, { elCount });
    const entries = [];
    const hrefs = [];

    for (let index = 0; index < elCount; index++) {
      const element = await locators.nth(index);
      const innerText = await element.innerText();
      const href = await element.getAttribute('href');

      entries.push(innerText);
      hrefs.push(href);
    }

    this.logger.info(this.scanList.name, { entries });
    this.logger.info(this.scanList.name, { hrefs });
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
