import {MigrationInterface, QueryRunner} from "typeorm";

export class porcentajeFix1639972922985 implements MigrationInterface {
    name = 'porcentajeFix1639972922985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `movimientoslineas` DROP COLUMN `porcentaje`");
        await queryRunner.query("ALTER TABLE `movimientoslineas` ADD `porcentaje` double NULL DEFAULT '0'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `movimientoslineas` DROP COLUMN `porcentaje`");
        await queryRunner.query("ALTER TABLE `movimientoslineas` ADD `porcentaje` int NULL DEFAULT '0'");
    }

}
