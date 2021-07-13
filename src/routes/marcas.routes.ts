import { Request, Response, NextFunction } from "express";
import { MarcasController } from "../controllers/marcas.controller";
import * as mw from "./auth_mw";

export class MarcasRouter {
  public controlador: MarcasController = new MarcasController();

  public routes(app): void {
    app
      .route("/api/v1/marcas")
      .get(
        (req: Request, res: Response, next: NextFunction) => next(),
        mw.jwtAdminMiddleware,
        this.controlador.getAll
      )
      .post(mw.jwtAdminMiddleware, this.controlador.create);

    app.route('/api/v1/marcas/paginado')
      .get(mw.jwtAdminMiddleware, this.controlador.getPaginated)

    app
      .route("/api/v1/marca/:id")
      .get(mw.jwtAdminMiddleware, this.controlador.get)
      .put(mw.jwtAdminMiddleware, this.controlador.update)
      .delete(mw.jwtAdminMiddleware, this.controlador.delete);
  }
}
