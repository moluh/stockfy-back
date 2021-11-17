import {MigrationInterface, QueryRunner} from "typeorm";

export class NombreMigracion1637129563600 implements MigrationInterface {
    name = 'NombreMigracion1637129563600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `marcas` (`id` int NOT NULL AUTO_INCREMENT, `marca` varchar(150) NOT NULL, `activo` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `imagenes` (`id` int NOT NULL AUTO_INCREMENT, `img_thumb` text NULL, `url` text NULL, `productoId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `proveedores` (`id` int NOT NULL AUTO_INCREMENT, `proveedor` varchar(150) NOT NULL, `activo` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `talles` (`id` int NOT NULL AUTO_INCREMENT, `talle` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `productos` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NOT NULL, `descripcion` text NOT NULL, `unidad` int NOT NULL, `archivado` tinyint NOT NULL DEFAULT 0, `alto` int NULL, `ancho` int NULL, `profundidad` int NULL, `peso` int NULL, `precio_costo` double NULL, `precio_venta` double NULL, `disponible` tinyint NOT NULL DEFAULT 1, `rebaja` int NULL, `sku` varchar(255) NULL, `ean` varchar(255) NULL, `stock_actual` int NULL, `codigo_fabricante` varchar(150) NULL, `proveedorId` int NULL, `marcaId` int NULL, `categoriaUnoId` int NULL, `categoriaDosId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `categorias` (`id` int NOT NULL AUTO_INCREMENT, `categoria` varchar(255) NOT NULL, `activo` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `clientes` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(150) NULL, `apellido` varchar(150) NULL, `provincia` varchar(150) NULL, `localidad` varchar(150) NULL, `avatar` varchar(255) NULL, `telefono` varchar(30) NULL, `domicilio` varchar(150) NULL, `email` varchar(70) NULL, `created_at` timestamp NULL, `updated_at` timestamp NULL, `activo` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `empleados` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(150) NULL, `apellido` varchar(150) NULL, `provincia` varchar(150) NULL, `localidad` varchar(150) NULL, `avatar` varchar(255) NULL, `telefono` varchar(30) NULL, `domicilio` varchar(150) NULL, `email` varchar(70) NULL, `recpass` varchar(6) NULL, `created_at` timestamp NULL, `updated_at` timestamp NULL, `role` varchar(255) NOT NULL, `nro_legajo` varchar(255) NOT NULL, `puesto` varchar(255) NULL, `activo` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `gastos` (`id` int NOT NULL AUTO_INCREMENT, `fecha` date NOT NULL, `hora` time NULL, `descripcion` varchar(255) NULL, `monto` double NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `movimientoslineas` (`id` int NOT NULL AUTO_INCREMENT, `id_producto` bigint NOT NULL, `cantidad` int NOT NULL, `unidad` int NOT NULL, `img` varchar(255) NULL, `nombre` varchar(255) NOT NULL, `descripcion` varchar(255) NOT NULL, `precio_venta` double NOT NULL, `precio_oferta` double NULL, `oferta` tinyint NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `pagos` (`id` int NOT NULL AUTO_INCREMENT, `monto` double NOT NULL, `fecha` date NULL, `hora` time NULL, `ganancia` double NOT NULL DEFAULT '0', `interes` tinyint NULL, `tasa_interes` double NOT NULL DEFAULT '0', `pago_nro` int NOT NULL DEFAULT '1', `movimientoId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `movimientos` (`id` int NOT NULL AUTO_INCREMENT, `fecha` date NULL, `hora` time NULL, `comentario` varchar(255) NULL, `estado` char(1) NULL, `total` double NOT NULL, `modo_pago` varchar(255) NULL, `saldo` double NULL, `clienteId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `usuarios` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(150) NOT NULL, `password` varchar(255) NOT NULL, `nombre` varchar(150) NULL, `apellido` varchar(150) NULL, `provincia` varchar(150) NULL, `localidad` varchar(150) NULL, `avatar` varchar(255) NULL, `telefono` varchar(30) NULL, `domicilio` varchar(40) NULL, `email` varchar(70) NULL, `recpass` varchar(6) NULL, `created_at` timestamp NULL, `updated_at` timestamp NULL, `role` varchar(20) NOT NULL, `activo` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `productos_talles_talles` (`productosId` int NOT NULL, `tallesId` int NOT NULL, INDEX `IDX_ac166d627e7c1677268a4519f9` (`productosId`), INDEX `IDX_8e7b3d2540671e0b5c6b0f4992` (`tallesId`), PRIMARY KEY (`productosId`, `tallesId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `movimientos_movimiento_lineas_movimientoslineas` (`movimientosId` int NOT NULL, `movimientoslineasId` int NOT NULL, INDEX `IDX_bce8d3f5525189d8a323e52877` (`movimientosId`), INDEX `IDX_253745b82953af8dce07db9705` (`movimientoslineasId`), PRIMARY KEY (`movimientosId`, `movimientoslineasId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `imagenes` ADD CONSTRAINT `FK_6a316a02cc75b27dc1c594e1bd9` FOREIGN KEY (`productoId`) REFERENCES `productos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `productos` ADD CONSTRAINT `FK_9f09bb7988802f18e97727f046a` FOREIGN KEY (`proveedorId`) REFERENCES `proveedores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `productos` ADD CONSTRAINT `FK_4f743618aa4b678c40b0f626391` FOREIGN KEY (`marcaId`) REFERENCES `marcas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `productos` ADD CONSTRAINT `FK_5e73eecad0e420b31db0766ff35` FOREIGN KEY (`categoriaUnoId`) REFERENCES `categorias`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `productos` ADD CONSTRAINT `FK_5a44f1119127242c9dc4adfdf4f` FOREIGN KEY (`categoriaDosId`) REFERENCES `categorias`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `pagos` ADD CONSTRAINT `FK_d12b4a03b26847049e635953a61` FOREIGN KEY (`movimientoId`) REFERENCES `movimientos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `movimientos` ADD CONSTRAINT `FK_3049431f4e3e78ba201222c198c` FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `productos_talles_talles` ADD CONSTRAINT `FK_ac166d627e7c1677268a4519f95` FOREIGN KEY (`productosId`) REFERENCES `productos`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `productos_talles_talles` ADD CONSTRAINT `FK_8e7b3d2540671e0b5c6b0f49920` FOREIGN KEY (`tallesId`) REFERENCES `talles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `movimientos_movimiento_lineas_movimientoslineas` ADD CONSTRAINT `FK_bce8d3f5525189d8a323e52877a` FOREIGN KEY (`movimientosId`) REFERENCES `movimientos`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `movimientos_movimiento_lineas_movimientoslineas` ADD CONSTRAINT `FK_253745b82953af8dce07db97056` FOREIGN KEY (`movimientoslineasId`) REFERENCES `movimientoslineas`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `movimientos_movimiento_lineas_movimientoslineas` DROP FOREIGN KEY `FK_253745b82953af8dce07db97056`");
        await queryRunner.query("ALTER TABLE `movimientos_movimiento_lineas_movimientoslineas` DROP FOREIGN KEY `FK_bce8d3f5525189d8a323e52877a`");
        await queryRunner.query("ALTER TABLE `productos_talles_talles` DROP FOREIGN KEY `FK_8e7b3d2540671e0b5c6b0f49920`");
        await queryRunner.query("ALTER TABLE `productos_talles_talles` DROP FOREIGN KEY `FK_ac166d627e7c1677268a4519f95`");
        await queryRunner.query("ALTER TABLE `movimientos` DROP FOREIGN KEY `FK_3049431f4e3e78ba201222c198c`");
        await queryRunner.query("ALTER TABLE `pagos` DROP FOREIGN KEY `FK_d12b4a03b26847049e635953a61`");
        await queryRunner.query("ALTER TABLE `productos` DROP FOREIGN KEY `FK_5a44f1119127242c9dc4adfdf4f`");
        await queryRunner.query("ALTER TABLE `productos` DROP FOREIGN KEY `FK_5e73eecad0e420b31db0766ff35`");
        await queryRunner.query("ALTER TABLE `productos` DROP FOREIGN KEY `FK_4f743618aa4b678c40b0f626391`");
        await queryRunner.query("ALTER TABLE `productos` DROP FOREIGN KEY `FK_9f09bb7988802f18e97727f046a`");
        await queryRunner.query("ALTER TABLE `imagenes` DROP FOREIGN KEY `FK_6a316a02cc75b27dc1c594e1bd9`");
        await queryRunner.query("DROP INDEX `IDX_253745b82953af8dce07db9705` ON `movimientos_movimiento_lineas_movimientoslineas`");
        await queryRunner.query("DROP INDEX `IDX_bce8d3f5525189d8a323e52877` ON `movimientos_movimiento_lineas_movimientoslineas`");
        await queryRunner.query("DROP TABLE `movimientos_movimiento_lineas_movimientoslineas`");
        await queryRunner.query("DROP INDEX `IDX_8e7b3d2540671e0b5c6b0f4992` ON `productos_talles_talles`");
        await queryRunner.query("DROP INDEX `IDX_ac166d627e7c1677268a4519f9` ON `productos_talles_talles`");
        await queryRunner.query("DROP TABLE `productos_talles_talles`");
        await queryRunner.query("DROP TABLE `usuarios`");
        await queryRunner.query("DROP TABLE `movimientos`");
        await queryRunner.query("DROP TABLE `pagos`");
        await queryRunner.query("DROP TABLE `movimientoslineas`");
        await queryRunner.query("DROP TABLE `gastos`");
        await queryRunner.query("DROP TABLE `empleados`");
        await queryRunner.query("DROP TABLE `clientes`");
        await queryRunner.query("DROP TABLE `categorias`");
        await queryRunner.query("DROP TABLE `productos`");
        await queryRunner.query("DROP TABLE `talles`");
        await queryRunner.query("DROP TABLE `proveedores`");
        await queryRunner.query("DROP TABLE `imagenes`");
        await queryRunner.query("DROP TABLE `marcas`");
    }

}
