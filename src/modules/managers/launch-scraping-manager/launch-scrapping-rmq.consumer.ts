import { RabbitPayload, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { chromium } from 'playwright';
import type { Page } from 'playwright-core';

import { LoggerService } from '~/logger/logger.service';
import { ConfigurationService } from '~/modules/configurations/configuration.service';
import { RmqExchangesEnum, RmqQueuesEnum, RmqRoutesEnum } from '~/providers/rmq/enums';
import { RmqService } from '~/providers/rmq/rmq.service';

@Injectable()
export class LaunchScrappingRmqConsumer {
  private readonly logger: LoggerService;
  private readonly baseFbUrl: string;

  constructor(private readonly configurationService: ConfigurationService, private readonly rmqService: RmqService) {
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
  private async scraping(@RabbitPayload() payload: { url: string; isList: boolean; scanPages: number }): Promise<void> {
    this.logger.info(this.scraping.name, payload);

    try {
      const browser = await chromium.launch();
      this.logger.info(this.scraping.name, { browser });
      const page = await browser.newPage();
      await this.login(page);
      if (payload.isList) {
        await this.scanList(
          payload.url,
          page,
          '.x139jcc6 .x1uepa24 .xjp7ctv .x1iyjqo2 .x3ct3a4 > a.x1lku1pv',
          payload.scanPages
        );
      }
      await browser.close();
    } catch (error) {
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
    for (let index = 0; index < pages; index++) {
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight);');
      await this.sleep(5000);
    }
    const locators = page.locator(selector);
    const elementCount = await locators.count();
    const entries = [];

    for (let index = 0; index < elementCount; index++) {
      const element = await locators.nth(index);
      const innerElements = await element.locator('.x1gslohp.xkh6y0r');
      const title = await (await innerElements.nth(1)).innerText();
      const price = await (await innerElements.nth(0)).innerText();
      const location = await (await innerElements.nth(2)).innerText();
      const link = await element.getAttribute('href');
      const linkSplitted = link?.split('/') || [];
      const idIndex = linkSplitted.indexOf('item') + 1;
      const image = await element.locator('img');
      const imageUrl = await image.getAttribute('src');

      if (!title) continue;

      const productItem = {
        title,
        price,
        location,
        link,
        fbId: linkSplitted[idIndex],
        imageUrl,
      };

      await this.rmqService.publish(RmqExchangesEnum.PRODUCTS_EXCHANGE, RmqRoutesEnum.SAVE_PRODUCT_ITEM, productItem);

      entries.push(productItem);
    }

    this.logger.info(this.scanList.name, { entries });
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
