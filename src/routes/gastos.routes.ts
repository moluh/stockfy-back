import { Request, Response, NextFunction } from "express";
import { GastosController } from "../controllers/gastos.controller";
import * as mw from "./auth_mw";

export class GastosRouter {
  public controlador: GastosController = new GastosController();

  public routes(app): void {
    app
      .route("/api/v1/gastos")
      .get(mw.jwtAdminMidleware, this.controlador.getAll)
      .post(mw.jwtAdminMidleware, this.controlador.create);

    app
      .route("/api/v1/gastos/paginado")
      .get(mw.jwtAdminMidleware, this.controlador.getPaginated);

    app
      .route("/api/v1/gasto/:id")
      .get(mw.jwtAdminMidleware, this.controlador.get)
      .put(mw.jwtAdminMidleware, this.controlador.update)
      .delete(mw.jwtAdminMidleware, this.controlador.delete);
  }
}
