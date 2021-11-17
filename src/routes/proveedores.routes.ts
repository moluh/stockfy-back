import { Request, Response, NextFunction } from "express";
import { ProveedoresController } from "../controllers/proveedores.controller";
import * as mw from "../auth/auth.middleware";

export class ProveedoresRouter {
  public controlador: ProveedoresController = new ProveedoresController();

  public routes(app): void {
    app
      .route("/api/v1/proveedores")
      .get(mw.jwtAdminMiddleware, this.controlador.getAll)
      .post(mw.jwtAdminMiddleware, this.controlador.create);

    app
      .route("/api/v1/proveedores/paginado")
      .get(mw.jwtAdminMiddleware, this.controlador.getPaginated);

    app
      .route("/api/v1/proveedor/:id")
      .get(mw.jwtAdminMiddleware, this.controlador.get)
      .put(mw.jwtAdminMiddleware, this.controlador.update)
      .delete(mw.jwtAdminMiddleware, this.controlador.delete);
  }
}
