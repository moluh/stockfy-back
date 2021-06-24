import { Request, Response, NextFunction } from "express";
import { PagosController } from "../controllers/pagos.controller";
import * as mw from "./auth_mw";

export class PagosRouter {
  public controlador: PagosController = new PagosController();

  public routes(app): void {
    app
      .route("/api/v1/pagos")
      .get(
        (req: Request, res: Response, next: NextFunction) => next(),
        mw.jwtEmpleadoMidleware,
        this.controlador.getAll
      )
      .post(mw.jwtEmpleadoMidleware, this.controlador.create);

    app.route('/api/v1/pagos/paginado')
      .get(mw.jwtEmpleadoMidleware, this.controlador.getPaginated)

    app.route("/api/v1/pago/:id/movimiento/:movimientoId")
      .delete(mw.jwtEmpleadoMidleware, this.controlador.delete)

    app
      .route("/api/v1/pago/:id")
      .get(this.controlador.get)
      .put(mw.jwtEmpleadoMidleware, this.controlador.update)
      .delete(mw.jwtEmpleadoMidleware, this.controlador.delete);
  }
}
