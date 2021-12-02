import { Request, Response, NextFunction } from "express";
import { MovimientosController } from "../controllers/movimientos.controller";
import * as mw from "../auth/auth.middleware";

export class MovimientosRouter {
  public controlador: MovimientosController = new MovimientosController();

  public routes(app): void {
    app
      .route("/api/v1/movimientos")
      .get(mw.jwtAdminMiddleware, this.controlador.getAll)
      .post(mw.jwtEmpleadoMiddleware, this.controlador.create);

    app
      .route("/api/v1/movimiento/:id")
      .get(mw.jwtEmpleadoMiddleware, this.controlador.get)
      .put(mw.jwtEmpleadoMiddleware, this.controlador.update)
      .delete(mw.jwtEmpleadoMiddleware, this.controlador.delete);

    app
      .route("/api/v1/movimiento/:id/state/:state")
      .post(mw.jwtEmpleadoMiddleware, this.controlador.changeState);
      
    app
      .route("/api/v1/movimientos/paginado/filter")
      .get(mw.jwtEmpleadoMiddleware, this.controlador.getPaginatedAndFilter);

    app
      .route("/api/v1/movimientos/paginado/clienteId/:clientId")
      .get(mw.jwtEmpleadoMiddleware, this.controlador.getPaginatedByClientId);

    app
      .route("/api/v1/movimientos/paginado")
      .get(mw.jwtEmpleadoMiddleware, this.controlador.getPaginated);

    app
      .route("/api/v1/movimientos/paginado/desde/:from/hasta/:to")
      .get(mw.jwtEmpleadoMiddleware, this.controlador.getPaginatedBetweenDates);

    app
      .route("/api/v1/movimientos/paginado/fecha/:date")
      .get(mw.jwtEmpleadoMiddleware, this.controlador.getPaginatedByDate);
  }
}
