import { Request, Response, NextFunction } from "express";
import { PagosController } from "../controllers/pagos.controller";
import * as mw from "../auth/auth.middleware";
import { EMPLEADO, SUPERADMIN } from "../helpers/roles";

export class PagosRouter {
  public controlador: PagosController = new PagosController();

  public routes(app): void {
    app
      .route("/api/v1/pagos")
      .get(
        (req: Request, res: Response, next: NextFunction) => next(),
        mw.isAllowed([EMPLEADO,SUPERADMIN]),
        this.controlador.getAll
      )
      .post(mw.isAllowed([EMPLEADO,SUPERADMIN]), this.controlador.create);

    app.route('/api/v1/pagos/paginado')
      .get(mw.isAllowed([EMPLEADO,SUPERADMIN]), this.controlador.getPaginated)

    app.route("/api/v1/pago/:id/movimiento/:movimientoId")
      .delete(mw.isAllowed([EMPLEADO,SUPERADMIN]), this.controlador.delete)

    app
      .route("/api/v1/pago/:id")
      .get(this.controlador.get)
      .put(mw.isAllowed([EMPLEADO,SUPERADMIN]), this.controlador.update)
      .delete(mw.isAllowed([EMPLEADO,SUPERADMIN]), this.controlador.delete);
  }
}
