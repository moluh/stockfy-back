import { Request, Response, NextFunction } from "express";
import { ClientesController } from "../controllers/clientes.controller";
import * as mw from "../auth/auth.middleware";

export class ClientesRouter {
  public controlador: ClientesController = new ClientesController();

  public routes(app): void {
    app
      .route("/api/v1/clientes")
      .get(mw.jwtAdminMiddleware, this.controlador.getAll)
      .post(mw.jwtEmpleadoMiddleware, this.controlador.create);

    app
      .route("/api/v1/cliente/:id")
      .get(mw.jwtEmpleadoMiddleware, this.controlador.get)
      .put(mw.jwtAdminMiddleware, this.controlador.update)
      .delete(mw.jwtAdminMiddleware, this.controlador.delete);

    app
      .route("/api/v1/clientes/paginado")
      .get(mw.jwtEmpleadoMiddleware, this.controlador.getPaginated);

    app
      .route("/api/v1/clientes/paginado/filter")
      .get(mw.jwtEmpleadoMiddleware, this.controlador.getPaginatedAndFilter);
  }
}
