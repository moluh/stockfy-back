import { Request, Response, NextFunction } from "express";
import { UsuariosController } from "../controllers/usuarios.controller";
import * as mw from "./auth_mw";

export class UsuariosRouter {
  public controlador: UsuariosController = new UsuariosController();

  public routes(app): void {
    app
      .route("/api/v1/usuarios")
      .get(mw.jwtAdminMidleware, this.controlador.getAll)
      .post(this.controlador.create);

    app
      .route("/api/v1/usuario/:id")
      .get(mw.jwtAdminMidleware, this.controlador.get)
      .put(mw.jwtAdminMidleware, this.controlador.update)
      .delete(mw.jwtAdminMidleware, this.controlador.delete);

    app
      .route("/api/v1/usuarios/paginado")
      .get(mw.jwtAdminMidleware, this.controlador.getPaginated);

    app
      .route("/api/v1/usuarios/paginado/filter")
      .get(mw.jwtAdminMidleware, this.controlador.getPaginatedAndFilter);

    app
      .route("/api/v1/usuarios/recpass/:recpass")
      .get(mw.jwtAdminMidleware, this.controlador.getByRecpass);

    app
      .route("/api/v1/usuario/updatepass/:id")
      .put(mw.jwtAdminMidleware, this.controlador.updatePasswordUsuario);
  }
}
