import {MigrationInterface, QueryRunner} from "typeorm";

export class mig1638753435214 implements MigrationInterface {
    name = 'mig1638753435214'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `productos_categorias` DROP FOREIGN KEY `FK_d324f2eb5d15064af3022ad489e`");
        await queryRunner.query("ALTER TABLE `productos` ADD `descripcion_html` text NULL");
        await queryRunner.query("ALTER TABLE `imagenes` DROP FOREIGN KEY `FK_6a316a02cc75b27dc1c594e1bd9`");
        await queryRunner.query("ALTER TABLE `imagenes` CHANGE `img_thumb` `img_thumb` text NULL");
        await queryRunner.query("ALTER TABLE `imagenes` CHANGE `url` `url` text NULL");
        await queryRunner.query("ALTER TABLE `imagenes` CHANGE `productoId` `productoId` int NULL");
        await queryRunner.query("ALTER TABLE `productos` DROP FOREIGN KEY `FK_9f09bb7988802f18e97727f046a`");
        await queryRunner.query("ALTER TABLE `productos` DROP FOREIGN KEY `FK_4f743618aa4b678c40b0f626391`");
        await queryRunner.query("ALTER TABLE `productos` CHANGE `descripcion` `descripcion` text NULL");
        await queryRunner.query("ALTER TABLE `productos` DROP COLUMN `unidad`");
        await queryRunner.query("ALTER TABLE `productos` ADD `unidad` varchar(20) NULL");
        await queryRunner.query("ALTER TABLE `productos` DROP COLUMN `alto`");
        await queryRunner.query("ALTER TABLE `productos` ADD `alto` double NULL");
        await queryRunner.query("ALTER TABLE `productos` DROP COLUMN `ancho`");
        await queryRunner.query("ALTER TABLE `productos` ADD `ancho` double NULL");
        await queryRunner.query("ALTER TABLE `productos` DROP COLUMN `profundidad`");
        await queryRunner.query("ALTER TABLE `productos` ADD `profundidad` double NULL");
        await queryRunner.query("ALTER TABLE `productos` DROP COLUMN `peso`");
        await queryRunner.query("ALTER TABLE `productos` ADD `peso` double NULL");
        await queryRunner.query("ALTER TABLE `productos` CHANGE `precio_costo` `precio_costo` double NULL");
        await queryRunner.query("ALTER TABLE `productos` CHANGE `precio_venta` `precio_venta` double NULL");
        await queryRunner.query("ALTER TABLE `productos` DROP COLUMN `rebaja`");
        await queryRunner.query("ALTER TABLE `productos` ADD `rebaja` double NULL");
        await queryRunner.query("ALTER TABLE `productos` CHANGE `sku` `sku` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `productos` CHANGE `ean` `ean` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `productos` CHANGE `stock_actual` `stock_actual` int NULL");
        await queryRunner.query("ALTER TABLE `productos` CHANGE `codigo_fabricante` `codigo_fabricante` varchar(150) NULL");
        await queryRunner.query("ALTER TABLE `productos` CHANGE `proveedorId` `proveedorId` int NULL");
        await queryRunner.query("ALTER TABLE `productos` CHANGE `marcaId` `marcaId` int NULL");
        await queryRunner.query("ALTER TABLE `gastos` CHANGE `hora` `hora` time NULL");
        await queryRunner.query("ALTER TABLE `gastos` CHANGE `descripcion` `descripcion` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `usuarios` CHANGE `nombre` `nombre` varchar(150) NULL");
        await queryRunner.query("ALTER TABLE `usuarios` CHANGE `apellido` `apellido` varchar(150) NULL");
        await queryRunner.query("ALTER TABLE `usuarios` CHANGE `provincia` `provincia` varchar(150) NULL");
        await queryRunner.query("ALTER TABLE `usuarios` CHANGE `localidad` `localidad` varchar(150) NULL");
        await queryRunner.query("ALTER TABLE `usuarios` CHANGE `avatar` `avatar` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `usuarios` CHANGE `telefono` `telefono` varchar(30) NULL");
        await queryRunner.query("ALTER TABLE `usuarios` CHANGE `domicilio` `domicilio` varchar(40) NULL");
        await queryRunner.query("ALTER TABLE `usuarios` CHANGE `recpass` `recpass` varchar(6) NULL");
        await queryRunner.query("ALTER TABLE `movimientoslineas` CHANGE `img` `img` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `movimientoslineas` CHANGE `precio_oferta` `precio_oferta` double NULL");
        await queryRunner.query("ALTER TABLE `pagos` DROP FOREIGN KEY `FK_d12b4a03b26847049e635953a61`");
        await queryRunner.query("ALTER TABLE `pagos` CHANGE `fecha` `fecha` date NULL");
        await queryRunner.query("ALTER TABLE `pagos` CHANGE `hora` `hora` time NULL");
        await queryRunner.query("ALTER TABLE `pagos` CHANGE `interes` `interes` tinyint NULL");
        await queryRunner.query("ALTER TABLE `pagos` CHANGE `movimientoId` `movimientoId` int NULL");
        await queryRunner.query("ALTER TABLE `movimientos` DROP FOREIGN KEY `FK_82b5cb68093077742683848ee82`");
        await queryRunner.query("ALTER TABLE `movimientos` CHANGE `fecha` `fecha` date NULL");
        await queryRunner.query("ALTER TABLE `movimientos` CHANGE `hora` `hora` time NULL");
        await queryRunner.query("ALTER TABLE `movimientos` CHANGE `comentario` `comentario` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `movimientos` CHANGE `estado` `estado` varchar(15) NULL");
        await queryRunner.query("ALTER TABLE `movimientos` CHANGE `modo_pago` `modo_pago` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `movimientos` CHANGE `saldo` `saldo` double NULL");
        await queryRunner.query("ALTER TABLE `movimientos` CHANGE `usuarioId` `usuarioId` int NULL");
        await queryRunner.query("ALTER TABLE `imagenes` ADD CONSTRAINT `FK_6a316a02cc75b27dc1c594e1bd9` FOREIGN KEY (`productoId`) REFERENCES `productos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `productos` ADD CONSTRAINT `FK_9f09bb7988802f18e97727f046a` FOREIGN KEY (`proveedorId`) REFERENCES `proveedores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `productos` ADD CONSTRAINT `FK_4f743618aa4b678c40b0f626391` FOREIGN KEY (`marcaId`) REFERENCES `marcas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `pagos` ADD CONSTRAINT `FK_d12b4a03b26847049e635953a61` FOREIGN KEY (`movimientoId`) REFERENCES `movimientos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `movimientos` ADD CONSTRAINT `FK_82b5cb68093077742683848ee82` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `productos_categorias` ADD CONSTRAINT `FK_d324f2eb5d15064af3022ad489e` FOREIGN KEY (`categorias`) REFERENCES `categorias`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `productos_categorias` DROP FOREIGN KEY `FK_d324f2eb5d15064af3022ad489e`");
        await queryRunner.query("ALTER TABLE `movimientos` DROP FOREIGN KEY `FK_82b5cb68093077742683848ee82`");
        await queryRunner.query("ALTER TABLE `pagos` DROP FOREIGN KEY `FK_d12b4a03b26847049e635953a61`");
        await queryRunner.query("ALTER TABLE `productos` DROP FOREIGN KEY `FK_4f743618aa4b678c40b0f626391`");
        await queryRunner.query("ALTER TABLE `productos` DROP FOREIGN KEY `FK_9f09bb7988802f18e97727f046a`");
        await queryRunner.query("ALTER TABLE `imagenes` DROP FOREIGN KEY `FK_6a316a02cc75b27dc1c594e1bd9`");
        await queryRunner.query("ALTER TABLE `movimientos` CHANGE `usuarioId` `usuarioId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `movimientos` CHANGE `saldo` `saldo` double(22) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `movimientos` CHANGE `modo_pago` `modo_pago` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `movimientos` CHANGE `estado` `estado` varchar(15) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `movimientos` CHANGE `comentario` `comentario` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `movimientos` CHANGE `hora` `hora` time NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `movimientos` CHANGE `fecha` `fecha` date NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `movimientos` ADD CONSTRAINT `FK_82b5cb68093077742683848ee82` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `pagos` CHANGE `movimientoId` `movimientoId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `pagos` CHANGE `interes` `interes` tinyint NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `pagos` CHANGE `hora` `hora` time NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `pagos` CHANGE `fecha` `fecha` date NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `pagos` ADD CONSTRAINT `FK_d12b4a03b26847049e635953a61` FOREIGN KEY (`movimientoId`) REFERENCES `movimientos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `movimientoslineas` CHANGE `precio_oferta` `precio_oferta` double(22) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `movimientoslineas` CHANGE `img` `img` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `usuarios` CHANGE `recpass` `recpass` varchar(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `usuarios` CHANGE `domicilio` `domicilio` varchar(40) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `usuarios` CHANGE `telefono` `telefono` varchar(30) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `usuarios` CHANGE `avatar` `avatar` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `usuarios` CHANGE `localidad` `localidad` varchar(150) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `usuarios` CHANGE `provincia` `provincia` varchar(150) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `usuarios` CHANGE `apellido` `apellido` varchar(150) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `usuarios` CHANGE `nombre` `nombre` varchar(150) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `gastos` CHANGE `descripcion` `descripcion` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `gastos` CHANGE `hora` `hora` time NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `productos` CHANGE `marcaId` `marcaId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `productos` CHANGE `proveedorId` `proveedorId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `productos` CHANGE `codigo_fabricante` `codigo_fabricante` varchar(150) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `productos` CHANGE `stock_actual` `stock_actual` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `productos` CHANGE `ean` `ean` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `productos` CHANGE `sku` `sku` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `productos` DROP COLUMN `rebaja`");
        await queryRunner.query("ALTER TABLE `productos` ADD `rebaja` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `productos` CHANGE `precio_venta` `precio_venta` double(22) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `productos` CHANGE `precio_costo` `precio_costo` double(22) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `productos` DROP COLUMN `peso`");
        await queryRunner.query("ALTER TABLE `productos` ADD `peso` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `productos` DROP COLUMN `profundidad`");
        await queryRunner.query("ALTER TABLE `productos` ADD `profundidad` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `productos` DROP COLUMN `ancho`");
        await queryRunner.query("ALTER TABLE `productos` ADD `ancho` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `productos` DROP COLUMN `alto`");
        await queryRunner.query("ALTER TABLE `productos` ADD `alto` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `productos` DROP COLUMN `unidad`");
        await queryRunner.query("ALTER TABLE `productos` ADD `unidad` int NOT NULL");
        await queryRunner.query("ALTER TABLE `productos` CHANGE `descripcion` `descripcion` text NOT NULL");
        await queryRunner.query("ALTER TABLE `productos` ADD CONSTRAINT `FK_4f743618aa4b678c40b0f626391` FOREIGN KEY (`marcaId`) REFERENCES `marcas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `productos` ADD CONSTRAINT `FK_9f09bb7988802f18e97727f046a` FOREIGN KEY (`proveedorId`) REFERENCES `proveedores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `imagenes` CHANGE `productoId` `productoId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `imagenes` CHANGE `url` `url` text NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `imagenes` CHANGE `img_thumb` `img_thumb` text NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `imagenes` ADD CONSTRAINT `FK_6a316a02cc75b27dc1c594e1bd9` FOREIGN KEY (`productoId`) REFERENCES `productos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `productos` DROP COLUMN `descripcion_html`");
        await queryRunner.query("ALTER TABLE `productos_categorias` ADD CONSTRAINT `FK_d324f2eb5d15064af3022ad489e` FOREIGN KEY (`categorias`) REFERENCES `talles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

}