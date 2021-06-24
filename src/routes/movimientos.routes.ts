import { Request, Response, NextFunction } from "express";
import { MovimientosController } from "../controllers/movimientos.controller";
import * as mw from "./auth_mw";

export class MovimientosRouter {
  public controlador: MovimientosController = new MovimientosController();

  public routes(app): void {
    app
      .route("/api/v1/movimientos")
      .get(mw.jwtAdminMidleware, this.controlador.getAll)
      .post(mw.jwtEmpleadoMidleware, this.controlador.create);

    app
      .route("/api/v1/movimiento/:id")
      .get(mw.jwtEmpleadoMidleware, this.controlador.get)
      .put(mw.jwtEmpleadoMidleware, this.controlador.update)
      .delete(mw.jwtEmpleadoMidleware, this.controlador.delete);

    app
      .route("/api/v1/movimiento/:id/state/:state")
      .post(mw.jwtEmpleadoMidleware, this.controlador.changeState);

    app
      .route("/api/v1/movimientos/paginado/cliente/:id/estado/:est")
      .get(
        mw.jwtEmpleadoMidleware,
        this.controlador.getPaginatedByEstadoAndClient
      );

    app
      .route("/api/v1/movimientos/paginado/cliente/:id")
      .get(mw.jwtEmpleadoMidleware, this.controlador.getPaginatedByClient);

    app
      .route("/api/v1/movimientos/paginado")
      .get(mw.jwtEmpleadoMidleware, this.controlador.getPaginated);
  }
}
