import { Request, Response, NextFunction } from "express";
import { GastosController } from "../controllers/gastos.controller";
import * as mw from "../middlewares/auth.middleware";
import { SUPERADMIN } from "../helpers/roles";

export class GastosRouter {
  public controlador: GastosController = new GastosController();

  public routes(app): void {
    app
      .route("/api/v1/gastos")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.getAll)
      .post(mw.isAllowed([SUPERADMIN]), this.controlador.create);

    app
      .route("/api/v1/gastos/paginado")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.getPaginated);

    app
      .route("/api/v1/gasto/:id")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.get)
      .put(mw.isAllowed([SUPERADMIN]), this.controlador.update)
      .delete(mw.isAllowed([SUPERADMIN]), this.controlador.delete);
  }
}
