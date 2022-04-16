import { Request, Response, NextFunction } from "express";
import { ImagenesController } from "../controllers/imagenes.controller";
import * as mw from "../middlewares/auth.middleware";
import { SUPERADMIN } from "../helpers/roles";

export class ImagenesRouter {
  public controlador: ImagenesController = new ImagenesController();

  public routes(app): void {
    app
      .route("/api/v1/imagenes")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.getAll)
      .post(mw.isAllowed([SUPERADMIN]), this.controlador.create);

    app
      .route("/api/v1/imagen/:id")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.get)
      .put(mw.isAllowed([SUPERADMIN]), this.controlador.update)
      .delete(mw.isAllowed([SUPERADMIN]), this.controlador.delete);
  }
}
