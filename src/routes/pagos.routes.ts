import { Request, Response, NextFunction } from "express";
import { PagosController } from "../controllers/pagos.controller";
import * as mw from "../auth/auth.middleware";

export class PagosRouter {
  public controlador: PagosController = new PagosController();

  public routes(app): void {
    app
      .route("/api/v1/pagos")
      .get(
        (req: Request, res: Response, next: NextFunction) => next(),
        mw.jwtEmpleadoMiddleware,
        this.controlador.getAll
      )
      .post(mw.jwtEmpleadoMiddleware, this.controlador.create);

    app.route('/api/v1/pagos/paginado')
      .get(mw.jwtEmpleadoMiddleware, this.controlador.getPaginated)

    app.route("/api/v1/pago/:id/movimiento/:movimientoId")
      .delete(mw.jwtEmpleadoMiddleware, this.controlador.delete)

    app
      .route("/api/v1/pago/:id")
      .get(this.controlador.get)
      .put(mw.jwtEmpleadoMiddleware, this.controlador.update)
      .delete(mw.jwtEmpleadoMiddleware, this.controlador.delete);
  }
}
