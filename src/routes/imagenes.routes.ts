import { Request, Response, NextFunction } from "express";
import { ImagenesController } from "../controllers/imagenes.controller";
import * as mw from "../auth/auth.middleware";

export class ImagenesRouter {
  public controlador: ImagenesController = new ImagenesController();

  public routes(app): void {
    app
      .route("/api/v1/imagenes")
      .get(mw.jwtAdminMiddleware, this.controlador.getAll)
      .post(mw.jwtAdminMiddleware, this.controlador.create);

    app
      .route("/api/v1/imagen/:id")
      .get(mw.jwtAdminMiddleware, this.controlador.get)
      .put(mw.jwtAdminMiddleware, this.controlador.update)
      .delete(mw.jwtAdminMiddleware, this.controlador.delete);
  }
}
