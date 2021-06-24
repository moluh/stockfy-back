import { Request, Response, NextFunction } from "express";
import { ImagenesController } from "../controllers/imagenes.controller";
import * as mw from "./auth_mw";

export class ImagenesRouter {
  public controlador: ImagenesController = new ImagenesController();

  public routes(app): void {
    app
      .route("/api/v1/imagenes")
      .get(mw.jwtAdminMidleware, this.controlador.getAll)
      .post(mw.jwtAdminMidleware, this.controlador.create);

    app
      .route("/api/v1/imagen/:id")
      .get(mw.jwtAdminMidleware, this.controlador.get)
      .put(mw.jwtAdminMidleware, this.controlador.update)
      .delete(mw.jwtAdminMidleware, this.controlador.delete);
  }
}
