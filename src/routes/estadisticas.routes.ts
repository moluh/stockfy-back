import { Request, Response, NextFunction } from "express";
import { EstadisticasController } from "../controllers/estadisticas.controller";
import * as mw from "../auth/auth.middleware";

export class EstadisticasRouter {
  public controlador: EstadisticasController = new EstadisticasController();

  public routes(app): void {
    app
      .route("/api/v1/estadisticas")
      .post(mw.jwtAdminMiddleware, this.controlador.getBetweenDates);
    app
      .route("/api/v1/estadisticas/grafico")
      .post(mw.jwtAdminMiddleware, this.controlador.getBetweenDatesGraphic);

    app
      .route("/api/v1/dashboard")
      .get(mw.jwtEmpleadoMiddleware, this.controlador.dashboard);
  }
}
