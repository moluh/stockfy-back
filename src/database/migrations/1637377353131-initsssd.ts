import {MigrationInterface, QueryRunner} from "typeorm";

export class initsssd1637377353131 implements MigrationInterface {
    name = 'initsssd1637377353131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `permisos` ADD `moduloId` int NULL");
        await queryRunner.query("ALTER TABLE `modulos` ADD `roleId` int NULL");
        await queryRunner.query("ALTER TABLE `permisos` ADD CONSTRAINT `FK_fd7ba23e8563f6d5b5c3e7db737` FOREIGN KEY (`moduloId`) REFERENCES `modulos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `modulos` ADD CONSTRAINT `FK_7bf96be87d7fc026a167090eb1e` FOREIGN KEY (`roleId`) REFERENCES `modulos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `modulos` DROP FOREIGN KEY `FK_7bf96be87d7fc026a167090eb1e`");
        await queryRunner.query("ALTER TABLE `permisos` DROP FOREIGN KEY `FK_fd7ba23e8563f6d5b5c3e7db737`");
        await queryRunner.query("ALTER TABLE `modulos` DROP COLUMN `roleId`");
        await queryRunner.query("ALTER TABLE `permisos` DROP COLUMN `moduloId`");
    }

}
