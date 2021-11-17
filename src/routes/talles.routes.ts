import { Request, Response, NextFunction } from "express";
import { TallesController } from "../controllers/talles.controller";
import * as mw from "../auth/auth.middleware";

export class TallesRouter {
  public controlador: TallesController = new TallesController();

  public routes(app): void {
    app
      .route("/api/v1/talles")
      .get(mw.jwtAdminMiddleware, this.controlador.getAll)
      .post(mw.jwtAdminMiddleware, this.controlador.create);

    app
      .route("/api/v1/talle/:id")
      .get(mw.jwtAdminMiddleware, this.controlador.get)
      .put(mw.jwtAdminMiddleware, this.controlador.update)
      .delete(mw.jwtAdminMiddleware, this.controlador.delete);
  }
}
