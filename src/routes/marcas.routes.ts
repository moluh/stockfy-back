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
        mw.jwtAdminMidleware,
        this.controlador.getAll
      )
      .post(mw.jwtAdminMidleware, this.controlador.create);

    app.route('/api/v1/marcas/paginado')
      .get(mw.jwtAdminMidleware, this.controlador.getPaginated)

    app
      .route("/api/v1/marca/:id")
      .get(mw.jwtAdminMidleware, this.controlador.get)
      .put(mw.jwtAdminMidleware, this.controlador.update)
      .delete(mw.jwtAdminMidleware, this.controlador.delete);
  }
}
