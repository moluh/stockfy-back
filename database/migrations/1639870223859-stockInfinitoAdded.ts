import {MigrationInterface, QueryRunner} from "typeorm";

export class stockInfinitoAdded1639870223859 implements MigrationInterface {
    name = 'stockInfinitoAdded1639870223859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `productos` ADD `stock_infinito` tinyint NULL DEFAULT 0");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `productos` DROP COLUMN `stock_infinito`");
    }

}
