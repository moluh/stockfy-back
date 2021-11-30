import { Request, Response, NextFunction } from "express";
import { ModulosController } from "../controllers/modulos.controller";
import * as mw from "../auth/auth.middleware";

export class ModulosRouter {
  public controlador: ModulosController = new ModulosController();

  public routes(app): void {
    app
      .route("/api/v1/modulos")
      .get(
        (req: Request, res: Response, next: NextFunction) => next(),
        mw.jwtAdminMiddleware,
        this.controlador.getAll
      )
      .post(mw.jwtAdminMiddleware, this.controlador.create);

    app.route('/api/v1/modulos/paginado')
      .get(mw.jwtAdminMiddleware, this.controlador.getPaginated)

    app
      .route("/api/v1/modulo/:id")
      .get(mw.jwtAdminMiddleware, this.controlador.get)
      .put(mw.jwtAdminMiddleware, this.controlador.update)
      .delete(mw.jwtAdminMiddleware, this.controlador.delete);
  }
}