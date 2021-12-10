import { Request, Response, NextFunction } from "express";
import { ModulosController } from "../controllers/modulos.controller";
import * as mw from "../auth/auth.middleware";
import { SUPERADMIN } from "../helpers/roles";

export class ModulosRouter {
  public controlador: ModulosController = new ModulosController();

  public routes(app): void {
    app
      .route("/api/v1/modulos")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.getAll)
      .post(mw.isAllowed([SUPERADMIN]), this.controlador.create);

    app
      .route("/api/v1/modulos/paginado")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.getPaginated);

    app
      .route("/api/v1/modulo/:id")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.get)
      .put(mw.isAllowed([SUPERADMIN]), this.controlador.update)
      .delete(mw.isAllowed([SUPERADMIN]), this.controlador.delete);
  }
}
