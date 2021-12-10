import { Request, Response, NextFunction } from "express";
import { TallesController } from "../controllers/talles.controller";
import * as mw from "../auth/auth.middleware";
import { SUPERADMIN } from "../helpers/roles";

export class TallesRouter {
  public controlador: TallesController = new TallesController();

  public routes(app): void {
    app
      .route("/api/v1/talles")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.getAll)
      .post(mw.isAllowed([SUPERADMIN]), this.controlador.create);

    app
      .route("/api/v1/talle/:id")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.get)
      .put(mw.isAllowed([SUPERADMIN]), this.controlador.update)
      .delete(mw.isAllowed([SUPERADMIN]), this.controlador.delete);
  }
}
