import { RabbitPayload, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

import { LoggerService } from '~/logger/logger.service';
import { ProductItemsService } from '~/modules/fundamentals/product-items/product-items.service';
import { RmqExchangesEnum, RmqQueuesEnum, RmqRoutesEnum } from '~/providers/rmq/enums';

@Injectable()
export class ProductsRmqConsumer {
  private readonly logger: LoggerService;

  constructor(private readonly productItemsService: ProductItemsService) {
    this.logger = new LoggerService(ProductsRmqConsumer.name);
  }

  @RabbitSubscribe({
    exchange: RmqExchangesEnum.PRODUCTS_EXCHANGE,
    routingKey: RmqRoutesEnum.SAVE_PRODUCT_ITEM,
    queue: RmqQueuesEnum.SAVE_PRODUCT_ITEM,
  })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private async saveProductItem(
    @RabbitPayload()
    payload: {
      title: string;
      price: string;
      location: string;
      link: string;
      fbId: string;
      imageUrl: string;
    }
  ): Promise<void> {
    this.logger.info(this.saveProductItem.name, payload);

    try {
      await this.productItemsService.create({
        ...payload,
        price: payload.price.replace(/┬а/gi, ' '),
      });
    } catch (error) {
      this.logger.error(this.saveProductItem.name, error);
    }
  }
}
