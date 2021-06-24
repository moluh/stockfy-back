import { Request, Response, NextFunction } from "express";
import { ClientesController } from "../controllers/clientes.controller";
import * as mw from "./auth_mw";

export class ClientesRouter {
  public controlador: ClientesController = new ClientesController();

  public routes(app): void {
    app
      .route("/api/v1/clientes")
      .get(mw.jwtAdminMidleware, this.controlador.getAll)
      .post(mw.jwtEmpleadoMidleware, this.controlador.create);

    app
      .route("/api/v1/cliente/:id")
      .get(mw.jwtEmpleadoMidleware, this.controlador.get)
      .put(mw.jwtAdminMidleware, this.controlador.update)
      .delete(mw.jwtAdminMidleware, this.controlador.delete);

    app
      .route("/api/v1/clientes/paginado")
      .get(mw.jwtEmpleadoMidleware, this.controlador.getPaginated);

    app
      .route("/api/v1/clientes/paginado/filter")
      .get(mw.jwtEmpleadoMidleware, this.controlador.getPaginatedAndFilter);
  }
}
