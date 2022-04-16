import { Request, Response, NextFunction } from "express";
import { ProveedoresController } from "../controllers/proveedores.controller";
import * as mw from "../middlewares/auth.middleware";
import { SUPERADMIN } from "../helpers/roles";

export class ProveedoresRouter {
  public controlador: ProveedoresController = new ProveedoresController();

  public routes(app): void {
    app
      .route("/api/v1/proveedores")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.getAll)
      .post(mw.isAllowed([SUPERADMIN]), this.controlador.create);

    app
      .route("/api/v1/proveedores/paginado")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.getPaginated);

    app
      .route("/api/v1/proveedor/:id")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.get)
      .put(mw.isAllowed([SUPERADMIN]), this.controlador.update)
      .delete(mw.isAllowed([SUPERADMIN]), this.controlador.delete);
  }
}
