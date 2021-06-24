import { Request, Response, NextFunction } from "express";
import { TallesController } from "../controllers/talles.controller";
import * as mw from "./auth_mw";

export class TallesRouter {
  public controlador: TallesController = new TallesController();

  public routes(app): void {
    app
      .route("/api/v1/talles")
      .get(mw.jwtAdminMidleware, this.controlador.getAll)
      .post(mw.jwtAdminMidleware, this.controlador.create);

    app
      .route("/api/v1/talle/:id")
      .get(mw.jwtAdminMidleware, this.controlador.get)
      .put(mw.jwtAdminMidleware, this.controlador.update)
      .delete(mw.jwtAdminMidleware, this.controlador.delete);
  }
}
