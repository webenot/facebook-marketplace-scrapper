import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductItemsTable1693583304949 implements MigrationInterface {
  name = 'AddProductItemsTable1693583304949';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "product_items"
       (
           "id"        uuid                     NOT NULL DEFAULT uuid_generate_v4(),
           "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
           "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
           "title"     character varying        NOT NULL,
           "price"     character varying        NOT NULL,
           "location"  character varying        NOT NULL,
           "imageUrl"  character varying        NOT NULL,
           "link"      character varying        NOT NULL,
           "fbId"      character varying        NOT NULL,
           CONSTRAINT "UQ_33aa6bd7d2183a1d7c6f6642fcf" UNIQUE ("fbId"),
           CONSTRAINT "PK_84582bc395409e5ebca97ef4b86" PRIMARY KEY ("id")
       )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "product_items"`);
  }
}
