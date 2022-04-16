import { Request, Response, NextFunction } from "express";
import { EstadisticasController } from "../controllers/estadisticas.controller";
import * as mw from "../middlewares/auth.middleware";
import { SUPERADMIN, USUARIO } from "../helpers/roles";

export class EstadisticasRouter {
  public controlador: EstadisticasController = new EstadisticasController();

  public routes(app): void {
    app
      .route("/api/v1/estadisticas")
      .post(mw.isAllowed([SUPERADMIN]), this.controlador.getBetweenDates);
    app
      .route("/api/v1/estadisticas/grafico")
      .post(mw.isAllowed([SUPERADMIN]), this.controlador.getBetweenDatesGraphic);

    app
      .route("/api/v1/dashboard")
      .get(mw.isAllowed([USUARIO]), this.controlador.dashboard);
  }

}
