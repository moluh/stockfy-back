import { Request, Response, NextFunction } from "express";
import { EstadisticasController } from "../controllers/estadisticas.controller";
import * as mw from "./auth_mw";

export class EstadisticasRouter {
  public controlador: EstadisticasController = new EstadisticasController();

  public routes(app): void {
    app
      .route("/api/v1/estadisticas")
      .get(mw.jwtAdminMidleware, this.controlador.getBetweenDates)

    app
      .route("/api/v1/dashboard")
      .get(mw.jwtEmpleadoMidleware, this.controlador.dashboard)
      app
        .route("/api/v1/estadisticas/post")
        .get(this.controlador.post)

    app
      .route("/api/v1/estadisticas/paginado")
      .get(mw.jwtEmpleadoMidleware, this.controlador.getPaginated);

    app
      .route("/api/v1/estadisticas/paginado/filter")
  }
}
