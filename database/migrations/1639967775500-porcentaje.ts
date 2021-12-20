import {MigrationInterface, QueryRunner} from "typeorm";

export class porcentaje1639967775500 implements MigrationInterface {
    name = 'porcentaje1639967775500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `movimientoslineas` ADD `porcentaje` int NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `productos` DROP COLUMN `sku`");
        await queryRunner.query("ALTER TABLE `productos` ADD `sku` varchar(25) NULL");
        await queryRunner.query("ALTER TABLE `productos` DROP COLUMN `ean`");
        await queryRunner.query("ALTER TABLE `productos` ADD `ean` varchar(25) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `productos` DROP COLUMN `ean`");
        await queryRunner.query("ALTER TABLE `productos` ADD `ean` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `productos` DROP COLUMN `sku`");
        await queryRunner.query("ALTER TABLE `productos` ADD `sku` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `movimientoslineas` DROP COLUMN `porcentaje`");
    }

}
