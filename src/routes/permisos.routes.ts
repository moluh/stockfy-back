import { Request, Response, NextFunction } from "express";
import { PermisosController } from "../controllers/permisos.controller";
import * as mw from "../auth/auth.middleware";

export class PermisosRouter {
  public controlador: PermisosController = new PermisosController();

  public routes(app): void {
    app
      .route("/api/v1/permisos")
      .get(
        (req: Request, res: Response, next: NextFunction) => next(),
        mw.jwtAdminMiddleware,
        this.controlador.getAll
      )
      .post(mw.jwtAdminMiddleware, this.controlador.create);

    app.route('/api/v1/permisos/paginado')
      .get(mw.jwtAdminMiddleware, this.controlador.getPaginated)

    app
      .route("/api/v1/permiso/:id")
      .get(mw.jwtAdminMiddleware, this.controlador.get)
      .put(mw.jwtAdminMiddleware, this.controlador.update)
      .delete(mw.jwtAdminMiddleware, this.controlador.delete);
  }
}
