import {MigrationInterface, QueryRunner} from "typeorm";

export class initsssd1637296535005 implements MigrationInterface {
    name = 'initsssd1637296535005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `modulos` (`id` int NOT NULL AUTO_INCREMENT, `modulo` varchar(150) NOT NULL, `activo` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `permisos` (`id` int NOT NULL AUTO_INCREMENT, `permiso` varchar(150) NOT NULL, `activo` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `permisos`");
        await queryRunner.query("DROP TABLE `modulos`");
    }

}
