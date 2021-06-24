import { Request, Response, NextFunction } from "express";
import { ProveedoresController } from "../controllers/proveedores.controller";
import * as mw from "./auth_mw";

export class ProveedoresRouter {
  public controlador: ProveedoresController = new ProveedoresController();

  public routes(app): void {
    app
      .route("/api/v1/proveedores")
      .get(mw.jwtAdminMidleware, this.controlador.getAll)
      .post(mw.jwtAdminMidleware, this.controlador.create);

    app
      .route("/api/v1/proveedores/paginado")
      .get(mw.jwtAdminMidleware, this.controlador.getPaginated);

    app
      .route("/api/v1/proveedor/:id")
      .get(mw.jwtAdminMidleware, this.controlador.get)
      .put(mw.jwtAdminMidleware, this.controlador.update)
      .delete(mw.jwtAdminMidleware, this.controlador.delete);
  }
}
