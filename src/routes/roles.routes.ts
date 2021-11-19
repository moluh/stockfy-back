import { Request, Response, NextFunction } from "express";
import { RolesController } from "../controllers/roles.controller";
import * as mw from "../auth/auth.middleware";

export class RolesRouter {
  public controlador: RolesController = new RolesController();

  public routes(app): void {
    app
      .route("/api/v1/roles")
      .get(mw.jwtAdminMiddleware, this.controlador.getAll)
      .post(mw.jwtAdminMiddleware, this.controlador.create);

    // app
    //   .route("/api/v1/roles/paginado")
    //   .get(mw.jwtAdminMiddleware, this.controlador.getPaginated);

    app
      .route("/api/v1/role/:id")
      .get(mw.jwtAdminMiddleware, this.controlador.get)
      .put(mw.jwtAdminMiddleware, this.controlador.update)
      .delete(mw.jwtAdminMiddleware, this.controlador.delete);
  }
}
