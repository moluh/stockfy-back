import {MigrationInterface, QueryRunner} from "typeorm";

export class initsssd1637288422800 implements MigrationInterface {
    name = 'initsssd1637288422800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `marcas` (`id` int NOT NULL AUTO_INCREMENT, `marca` varchar(150) NOT NULL, `activo` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `imagenes` (`id` int NOT NULL AUTO_INCREMENT, `img_thumb` text NULL, `url` text NULL, `productoId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `proveedores` (`id` int NOT NULL AUTO_INCREMENT, `proveedor` varchar(150) NOT NULL, `activo` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `talles` (`id` int NOT NULL AUTO_INCREMENT, `talle` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `productos` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NOT NULL, `descripcion` text NOT NULL, `unidad` int NOT NULL, `archivado` tinyint NOT NULL DEFAULT 0, `alto` int NULL, `ancho` int NULL, `profundidad` int NULL, `peso` int NULL, `precio_costo` double NULL, `precio_venta` double NULL, `disponible` tinyint NOT NULL DEFAULT 1, `rebaja` int NULL, `sku` varchar(255) NULL, `ean` varchar(255) NULL, `stock_actual` int NULL, `codigo_fabricante` varchar(150) NULL, `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `proveedorId` int NULL, `marcaId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `categorias` (`id` int NOT NULL AUTO_INCREMENT, `categoria` varchar(255) NOT NULL, `activo` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `gastos` (`id` int NOT NULL AUTO_INCREMENT, `fecha` date NOT NULL, `hora` time NULL, `descripcion` varchar(255) NULL, `monto` double NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `movimientoslineas` (`id` int NOT NULL AUTO_INCREMENT, `id_producto` bigint NOT NULL, `cantidad` int NOT NULL, `unidad` int NOT NULL, `img` varchar(255) NULL, `nombre` varchar(255) NOT NULL, `descripcion` varchar(255) NOT NULL, `precio_venta` double NOT NULL, `precio_oferta` double NULL, `oferta` tinyint NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `pagos` (`id` int NOT NULL AUTO_INCREMENT, `monto` double NOT NULL, `fecha` date NULL, `hora` time NULL, `ganancia` double NOT NULL DEFAULT '0', `interes` tinyint NULL, `tasa_interes` double NOT NULL DEFAULT '0', `pago_nro` int NOT NULL DEFAULT '1', `movimientoId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `roles` (`id` int NOT NULL AUTO_INCREMENT, `role` varchar(255) NOT NULL, `descripcion` varchar(255) NOT NULL DEFAULT '', `nivel` int NOT NULL DEFAULT '1', PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `usuarios` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(150) NOT NULL, `email` varchar(100) NOT NULL, `password` varchar(255) NOT NULL, `nombre` varchar(150) NULL, `apellido` varchar(150) NULL, `provincia` varchar(150) NULL, `localidad` varchar(150) NULL, `avatar` varchar(255) NULL, `telefono` varchar(30) NULL, `domicilio` varchar(40) NULL, `recpass` varchar(6) NULL, `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `activo` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `movimientos` (`id` int NOT NULL AUTO_INCREMENT, `fecha` date NULL, `hora` time NULL, `comentario` varchar(255) NULL, `estado` char(1) NULL, `total` double NOT NULL, `modo_pago` varchar(255) NULL, `saldo` double NULL, `usuarioId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `productos_talles_talles` (`productosId` int NOT NULL, `tallesId` int NOT NULL, INDEX `IDX_ac166d627e7c1677268a4519f9` (`productosId`), INDEX `IDX_8e7b3d2540671e0b5c6b0f4992` (`tallesId`), PRIMARY KEY (`productosId`, `tallesId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `productos_categorias_talles` (`productosId` int NOT NULL, `tallesId` int NOT NULL, INDEX `IDX_8d1d3cefb1ef6e5b92a05ff60b` (`productosId`), INDEX `IDX_8548f9b5051a08a0cabde4e179` (`tallesId`), PRIMARY KEY (`productosId`, `tallesId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `usuarios_roles_roles` (`usuariosId` int NOT NULL, `rolesId` int NOT NULL, INDEX `IDX_b237c8222e22352660e8eb2f40` (`usuariosId`), INDEX `IDX_b789c2cfc44002a4299ee2972b` (`rolesId`), PRIMARY KEY (`usuariosId`, `rolesId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `movimientos_movimiento_lineas_movimientoslineas` (`movimientosId` int NOT NULL, `movimientoslineasId` int NOT NULL, INDEX `IDX_bce8d3f5525189d8a323e52877` (`movimientosId`), INDEX `IDX_253745b82953af8dce07db9705` (`movimientoslineasId`), PRIMARY KEY (`movimientosId`, `movimientoslineasId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `imagenes` ADD CONSTRAINT `FK_6a316a02cc75b27dc1c594e1bd9` FOREIGN KEY (`productoId`) REFERENCES `productos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `productos` ADD CONSTRAINT `FK_9f09bb7988802f18e97727f046a` FOREIGN KEY (`proveedorId`) REFERENCES `proveedores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `productos` ADD CONSTRAINT `FK_4f743618aa4b678c40b0f626391` FOREIGN KEY (`marcaId`) REFERENCES `marcas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `pagos` ADD CONSTRAINT `FK_d12b4a03b26847049e635953a61` FOREIGN KEY (`movimientoId`) REFERENCES `movimientos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `movimientos` ADD CONSTRAINT `FK_82b5cb68093077742683848ee82` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `productos_talles_talles` ADD CONSTRAINT `FK_ac166d627e7c1677268a4519f95` FOREIGN KEY (`productosId`) REFERENCES `productos`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `productos_talles_talles` ADD CONSTRAINT `FK_8e7b3d2540671e0b5c6b0f49920` FOREIGN KEY (`tallesId`) REFERENCES `talles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `productos_categorias_talles` ADD CONSTRAINT `FK_8d1d3cefb1ef6e5b92a05ff60b8` FOREIGN KEY (`productosId`) REFERENCES `productos`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `productos_categorias_talles` ADD CONSTRAINT `FK_8548f9b5051a08a0cabde4e179b` FOREIGN KEY (`tallesId`) REFERENCES `talles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `usuarios_roles_roles` ADD CONSTRAINT `FK_b237c8222e22352660e8eb2f40a` FOREIGN KEY (`usuariosId`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `usuarios_roles_roles` ADD CONSTRAINT `FK_b789c2cfc44002a4299ee2972be` FOREIGN KEY (`rolesId`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `movimientos_movimiento_lineas_movimientoslineas` ADD CONSTRAINT `FK_bce8d3f5525189d8a323e52877a` FOREIGN KEY (`movimientosId`) REFERENCES `movimientos`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `movimientos_movimiento_lineas_movimientoslineas` ADD CONSTRAINT `FK_253745b82953af8dce07db97056` FOREIGN KEY (`movimientoslineasId`) REFERENCES `movimientoslineas`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `movimientos_movimiento_lineas_movimientoslineas` DROP FOREIGN KEY `FK_253745b82953af8dce07db97056`");
        await queryRunner.query("ALTER TABLE `movimientos_movimiento_lineas_movimientoslineas` DROP FOREIGN KEY `FK_bce8d3f5525189d8a323e52877a`");
        await queryRunner.query("ALTER TABLE `usuarios_roles_roles` DROP FOREIGN KEY `FK_b789c2cfc44002a4299ee2972be`");
        await queryRunner.query("ALTER TABLE `usuarios_roles_roles` DROP FOREIGN KEY `FK_b237c8222e22352660e8eb2f40a`");
        await queryRunner.query("ALTER TABLE `productos_categorias_talles` DROP FOREIGN KEY `FK_8548f9b5051a08a0cabde4e179b`");
        await queryRunner.query("ALTER TABLE `productos_categorias_talles` DROP FOREIGN KEY `FK_8d1d3cefb1ef6e5b92a05ff60b8`");
        await queryRunner.query("ALTER TABLE `productos_talles_talles` DROP FOREIGN KEY `FK_8e7b3d2540671e0b5c6b0f49920`");
        await queryRunner.query("ALTER TABLE `productos_talles_talles` DROP FOREIGN KEY `FK_ac166d627e7c1677268a4519f95`");
        await queryRunner.query("ALTER TABLE `movimientos` DROP FOREIGN KEY `FK_82b5cb68093077742683848ee82`");
        await queryRunner.query("ALTER TABLE `pagos` DROP FOREIGN KEY `FK_d12b4a03b26847049e635953a61`");
        await queryRunner.query("ALTER TABLE `productos` DROP FOREIGN KEY `FK_4f743618aa4b678c40b0f626391`");
        await queryRunner.query("ALTER TABLE `productos` DROP FOREIGN KEY `FK_9f09bb7988802f18e97727f046a`");
        await queryRunner.query("ALTER TABLE `imagenes` DROP FOREIGN KEY `FK_6a316a02cc75b27dc1c594e1bd9`");
        await queryRunner.query("DROP INDEX `IDX_253745b82953af8dce07db9705` ON `movimientos_movimiento_lineas_movimientoslineas`");
        await queryRunner.query("DROP INDEX `IDX_bce8d3f5525189d8a323e52877` ON `movimientos_movimiento_lineas_movimientoslineas`");
        await queryRunner.query("DROP TABLE `movimientos_movimiento_lineas_movimientoslineas`");
        await queryRunner.query("DROP INDEX `IDX_b789c2cfc44002a4299ee2972b` ON `usuarios_roles_roles`");
        await queryRunner.query("DROP INDEX `IDX_b237c8222e22352660e8eb2f40` ON `usuarios_roles_roles`");
        await queryRunner.query("DROP TABLE `usuarios_roles_roles`");
        await queryRunner.query("DROP INDEX `IDX_8548f9b5051a08a0cabde4e179` ON `productos_categorias_talles`");
        await queryRunner.query("DROP INDEX `IDX_8d1d3cefb1ef6e5b92a05ff60b` ON `productos_categorias_talles`");
        await queryRunner.query("DROP TABLE `productos_categorias_talles`");
        await queryRunner.query("DROP INDEX `IDX_8e7b3d2540671e0b5c6b0f4992` ON `productos_talles_talles`");
        await queryRunner.query("DROP INDEX `IDX_ac166d627e7c1677268a4519f9` ON `productos_talles_talles`");
        await queryRunner.query("DROP TABLE `productos_talles_talles`");
        await queryRunner.query("DROP TABLE `movimientos`");
        await queryRunner.query("DROP TABLE `usuarios`");
        await queryRunner.query("DROP TABLE `roles`");
        await queryRunner.query("DROP TABLE `pagos`");
        await queryRunner.query("DROP TABLE `movimientoslineas`");
        await queryRunner.query("DROP TABLE `gastos`");
        await queryRunner.query("DROP TABLE `categorias`");
        await queryRunner.query("DROP TABLE `productos`");
        await queryRunner.query("DROP TABLE `talles`");
        await queryRunner.query("DROP TABLE `proveedores`");
        await queryRunner.query("DROP TABLE `imagenes`");
        await queryRunner.query("DROP TABLE `marcas`");
    }

}
