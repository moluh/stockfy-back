import { Request, Response, NextFunction } from "express";
import { ProductosController } from "../controllers/productos.controller";
import * as mw from "../middlewares/auth.middleware";
import { EMPLEADO, SUPERADMIN } from "../helpers/roles";

export class ProductosRouter {
  public controlador: ProductosController = new ProductosController();

  public routes(app): void {
    app
      .route("/api/v1/productos")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.getAll)
      .post(mw.isAllowed([SUPERADMIN]), this.controlador.create);

    app
      .route("/api/v1/producto/:id")
      .get(mw.isAllowed([EMPLEADO, SUPERADMIN]), this.controlador.get)
      .put(mw.isAllowed([SUPERADMIN]), this.controlador.update)
      .delete(mw.isAllowed([SUPERADMIN]), this.controlador.delete);

    app
      .route("/api/v1/producto/state/:id")
      .post(mw.isAllowed([SUPERADMIN]), this.controlador.changeState);

    app
      .route("/api/v1/producto/barcodes/:id/sku/:sku/ean/:ean")
      .post(mw.isAllowed([SUPERADMIN]), this.controlador.createBarCodes);

    app
      .route("/api/v1/productos/paginado/state")
      .get(
        mw.isAllowed([EMPLEADO, SUPERADMIN]),
        this.controlador.getPaginatedByState
      );

    app
      .route("/api/v1/productos/paginado/list")
      .get(
        mw.isAllowed([EMPLEADO, SUPERADMIN]),
        this.controlador.getPaginatedByIdOfAList
      );

    app
      .route("/api/v1/productos/paginado/filter")
      .get(
        mw.isAllowed([EMPLEADO, SUPERADMIN]),
        this.controlador.getPaginatedAndFilter
      );

    app
      .route("/api/v1/productos/paginado")
      .get(mw.isAllowed([EMPLEADO, SUPERADMIN]), this.controlador.getPaginated);

    app
      .route("/api/v1/producto/barcode/:barcode")
      .get(mw.isAllowed([EMPLEADO, SUPERADMIN]), this.controlador.getByCodes);
  }
}
