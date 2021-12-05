import {MigrationInterface, QueryRunner} from "typeorm";

export class init1638640567723 implements MigrationInterface {
    name = 'init1638640567723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `marcas` (`id` int NOT NULL AUTO_INCREMENT, `marca` varchar(150) NOT NULL, `activo` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `imagenes` (`id` int NOT NULL AUTO_INCREMENT, `img_thumb` text NULL, `url` text NULL, `productoId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `proveedores` (`id` int NOT NULL AUTO_INCREMENT, `proveedor` varchar(150) NOT NULL, `activo` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `talles` (`id` int NOT NULL AUTO_INCREMENT, `talle` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `productos` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NOT NULL, `descripcion` text NOT NULL, `unidad` int NOT NULL, `archivado` tinyint NOT NULL DEFAULT 0, `alto` int NULL, `ancho` int NULL, `profundidad` int NULL, `peso` int NULL, `precio_costo` double NULL, `precio_venta` double NULL, `disponible` tinyint NOT NULL DEFAULT 1, `rebaja` int NULL, `sku` varchar(255) NULL, `ean` varchar(255) NULL, `stock_actual` int NULL, `codigo_fabricante` varchar(150) NULL, `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `proveedorId` int NULL, `marcaId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `categorias` (`id` int NOT NULL AUTO_INCREMENT, `categoria` varchar(255) NOT NULL, `activo` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `gastos` (`id` int NOT NULL AUTO_INCREMENT, `fecha` date NOT NULL, `hora` time NULL, `descripcion` varchar(255) NULL, `monto` double NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `roles` (`id` int NOT NULL AUTO_INCREMENT, `role` varchar(255) NOT NULL, `descripcion` varchar(255) NOT NULL DEFAULT '', `nivel` int NOT NULL DEFAULT '1', PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `usuarios` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(150) NOT NULL, `email` varchar(100) NOT NULL, `password` varchar(255) NOT NULL, `nombre` varchar(150) NULL, `apellido` varchar(150) NULL, `provincia` varchar(150) NULL, `localidad` varchar(150) NULL, `avatar` varchar(255) NULL, `telefono` varchar(30) NULL, `domicilio` varchar(40) NULL, `recpass` varchar(6) NULL, `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `activo` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `modulos` (`id` int NOT NULL AUTO_INCREMENT, `modulo` varchar(150) NOT NULL, `activo` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `movimientoslineas` (`id` int NOT NULL AUTO_INCREMENT, `id_producto` bigint NOT NULL, `cantidad` int NOT NULL, `unidad` int NOT NULL, `img` varchar(255) NULL, `nombre` varchar(255) NOT NULL, `descripcion` varchar(255) NOT NULL, `precio_venta` double NOT NULL, `precio_oferta` double NULL, `oferta` tinyint NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `pagos` (`id` int NOT NULL AUTO_INCREMENT, `monto` double NOT NULL, `fecha` date NULL, `hora` time NULL, `ganancia` double NOT NULL DEFAULT '0', `interes` tinyint NULL, `tasa_interes` double NOT NULL DEFAULT '0', `pago_nro` int NOT NULL DEFAULT '1', `movimientoId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `movimientos` (`id` int NOT NULL AUTO_INCREMENT, `fecha` date NULL, `hora` time NULL, `comentario` varchar(255) NULL, `estado` varchar(15) NULL, `total` double NOT NULL, `modo_pago` varchar(255) NULL, `saldo` double NULL, `usuarioId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `productos_talles` (`productos` int NOT NULL, `talles` int NOT NULL, INDEX `IDX_ad9b4cb9a428b6a9aed32b70d4` (`productos`), INDEX `IDX_4bef170594c9ca7c0a48e60729` (`talles`), PRIMARY KEY (`productos`, `talles`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `productos_categorias` (`productos` int NOT NULL, `categorias` int NOT NULL, INDEX `IDX_2cff377c4e91f7f1db515510a9` (`productos`), INDEX `IDX_d324f2eb5d15064af3022ad489` (`categorias`), PRIMARY KEY (`productos`, `categorias`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `usuarios_roles` (`usuarios` int NOT NULL, `roles` int NOT NULL, INDEX `IDX_536f1b37079700f1169ce0f5e3` (`usuarios`), INDEX `IDX_85a49331d45a9c67483200e0a6` (`roles`), PRIMARY KEY (`usuarios`, `roles`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `usuarios_modulos` (`usuarios` int NOT NULL, `modulos` int NOT NULL, INDEX `IDX_058b2b3c23acdea2d20db2fed1` (`usuarios`), INDEX `IDX_37530c4aeb7a297c30fdbd2215` (`modulos`), PRIMARY KEY (`usuarios`, `modulos`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `movimiento_lineas` (`movimientos` int NOT NULL, `movimiento_lineas` int NOT NULL, INDEX `IDX_bbf560f5a6778fb1a053368651` (`movimientos`), INDEX `IDX_d934e93af295d621057b3a242a` (`movimiento_lineas`), PRIMARY KEY (`movimientos`, `movimiento_lineas`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `imagenes` ADD CONSTRAINT `FK_6a316a02cc75b27dc1c594e1bd9` FOREIGN KEY (`productoId`) REFERENCES `productos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `productos` ADD CONSTRAINT `FK_9f09bb7988802f18e97727f046a` FOREIGN KEY (`proveedorId`) REFERENCES `proveedores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `productos` ADD CONSTRAINT `FK_4f743618aa4b678c40b0f626391` FOREIGN KEY (`marcaId`) REFERENCES `marcas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `pagos` ADD CONSTRAINT `FK_d12b4a03b26847049e635953a61` FOREIGN KEY (`movimientoId`) REFERENCES `movimientos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `movimientos` ADD CONSTRAINT `FK_82b5cb68093077742683848ee82` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `productos_talles` ADD CONSTRAINT `FK_ad9b4cb9a428b6a9aed32b70d43` FOREIGN KEY (`productos`) REFERENCES `productos`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `productos_talles` ADD CONSTRAINT `FK_4bef170594c9ca7c0a48e607294` FOREIGN KEY (`talles`) REFERENCES `talles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `productos_categorias` ADD CONSTRAINT `FK_2cff377c4e91f7f1db515510a96` FOREIGN KEY (`productos`) REFERENCES `productos`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `productos_categorias` ADD CONSTRAINT `FK_d324f2eb5d15064af3022ad489e` FOREIGN KEY (`categorias`) REFERENCES `talles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `usuarios_roles` ADD CONSTRAINT `FK_536f1b37079700f1169ce0f5e30` FOREIGN KEY (`usuarios`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `usuarios_roles` ADD CONSTRAINT `FK_85a49331d45a9c67483200e0a62` FOREIGN KEY (`roles`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `usuarios_modulos` ADD CONSTRAINT `FK_058b2b3c23acdea2d20db2fed15` FOREIGN KEY (`usuarios`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `usuarios_modulos` ADD CONSTRAINT `FK_37530c4aeb7a297c30fdbd2215d` FOREIGN KEY (`modulos`) REFERENCES `modulos`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `movimiento_lineas` ADD CONSTRAINT `FK_bbf560f5a6778fb1a053368651a` FOREIGN KEY (`movimientos`) REFERENCES `movimientos`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `movimiento_lineas` ADD CONSTRAINT `FK_d934e93af295d621057b3a242a6` FOREIGN KEY (`movimiento_lineas`) REFERENCES `movimientoslineas`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `movimiento_lineas` DROP FOREIGN KEY `FK_d934e93af295d621057b3a242a6`");
        await queryRunner.query("ALTER TABLE `movimiento_lineas` DROP FOREIGN KEY `FK_bbf560f5a6778fb1a053368651a`");
        await queryRunner.query("ALTER TABLE `usuarios_modulos` DROP FOREIGN KEY `FK_37530c4aeb7a297c30fdbd2215d`");
        await queryRunner.query("ALTER TABLE `usuarios_modulos` DROP FOREIGN KEY `FK_058b2b3c23acdea2d20db2fed15`");
        await queryRunner.query("ALTER TABLE `usuarios_roles` DROP FOREIGN KEY `FK_85a49331d45a9c67483200e0a62`");
        await queryRunner.query("ALTER TABLE `usuarios_roles` DROP FOREIGN KEY `FK_536f1b37079700f1169ce0f5e30`");
        await queryRunner.query("ALTER TABLE `productos_categorias` DROP FOREIGN KEY `FK_d324f2eb5d15064af3022ad489e`");
        await queryRunner.query("ALTER TABLE `productos_categorias` DROP FOREIGN KEY `FK_2cff377c4e91f7f1db515510a96`");
        await queryRunner.query("ALTER TABLE `productos_talles` DROP FOREIGN KEY `FK_4bef170594c9ca7c0a48e607294`");
        await queryRunner.query("ALTER TABLE `productos_talles` DROP FOREIGN KEY `FK_ad9b4cb9a428b6a9aed32b70d43`");
        await queryRunner.query("ALTER TABLE `movimientos` DROP FOREIGN KEY `FK_82b5cb68093077742683848ee82`");
        await queryRunner.query("ALTER TABLE `pagos` DROP FOREIGN KEY `FK_d12b4a03b26847049e635953a61`");
        await queryRunner.query("ALTER TABLE `productos` DROP FOREIGN KEY `FK_4f743618aa4b678c40b0f626391`");
        await queryRunner.query("ALTER TABLE `productos` DROP FOREIGN KEY `FK_9f09bb7988802f18e97727f046a`");
        await queryRunner.query("ALTER TABLE `imagenes` DROP FOREIGN KEY `FK_6a316a02cc75b27dc1c594e1bd9`");
        await queryRunner.query("DROP INDEX `IDX_d934e93af295d621057b3a242a` ON `movimiento_lineas`");
        await queryRunner.query("DROP INDEX `IDX_bbf560f5a6778fb1a053368651` ON `movimiento_lineas`");
        await queryRunner.query("DROP TABLE `movimiento_lineas`");
        await queryRunner.query("DROP INDEX `IDX_37530c4aeb7a297c30fdbd2215` ON `usuarios_modulos`");
        await queryRunner.query("DROP INDEX `IDX_058b2b3c23acdea2d20db2fed1` ON `usuarios_modulos`");
        await queryRunner.query("DROP TABLE `usuarios_modulos`");
        await queryRunner.query("DROP INDEX `IDX_85a49331d45a9c67483200e0a6` ON `usuarios_roles`");
        await queryRunner.query("DROP INDEX `IDX_536f1b37079700f1169ce0f5e3` ON `usuarios_roles`");
        await queryRunner.query("DROP TABLE `usuarios_roles`");
        await queryRunner.query("DROP INDEX `IDX_d324f2eb5d15064af3022ad489` ON `productos_categorias`");
        await queryRunner.query("DROP INDEX `IDX_2cff377c4e91f7f1db515510a9` ON `productos_categorias`");
        await queryRunner.query("DROP TABLE `productos_categorias`");
        await queryRunner.query("DROP INDEX `IDX_4bef170594c9ca7c0a48e60729` ON `productos_talles`");
        await queryRunner.query("DROP INDEX `IDX_ad9b4cb9a428b6a9aed32b70d4` ON `productos_talles`");
        await queryRunner.query("DROP TABLE `productos_talles`");
        await queryRunner.query("DROP TABLE `movimientos`");
        await queryRunner.query("DROP TABLE `pagos`");
        await queryRunner.query("DROP TABLE `movimientoslineas`");
        await queryRunner.query("DROP TABLE `modulos`");
        await queryRunner.query("DROP TABLE `usuarios`");
        await queryRunner.query("DROP TABLE `roles`");
        await queryRunner.query("DROP TABLE `gastos`");
        await queryRunner.query("DROP TABLE `categorias`");
        await queryRunner.query("DROP TABLE `productos`");
        await queryRunner.query("DROP TABLE `talles`");
        await queryRunner.query("DROP TABLE `proveedores`");
        await queryRunner.query("DROP TABLE `imagenes`");
        await queryRunner.query("DROP TABLE `marcas`");
    }

}
