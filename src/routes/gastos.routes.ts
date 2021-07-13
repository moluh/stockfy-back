import { Request, Response, NextFunction } from "express";
import { GastosController } from "../controllers/gastos.controller";
import * as mw from "./auth_mw";

export class GastosRouter {
  public controlador: GastosController = new GastosController();

  public routes(app): void {
    app
      .route("/api/v1/gastos")
      .get(mw.jwtAdminMiddleware, this.controlador.getAll)
      .post(mw.jwtAdminMiddleware, this.controlador.create);

    app
      .route("/api/v1/gastos/paginado")
      .get(mw.jwtAdminMiddleware, this.controlador.getPaginated);

    app
      .route("/api/v1/gasto/:id")
      .get(mw.jwtAdminMiddleware, this.controlador.get)
      .put(mw.jwtAdminMiddleware, this.controlador.update)
      .delete(mw.jwtAdminMiddleware, this.controlador.delete);
  }
}
