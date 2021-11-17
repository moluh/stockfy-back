import { Request, Response, NextFunction } from "express";
import { UsuariosController } from "../controllers/usuarios.controller";
import * as mw from "../auth/auth.middleware";

export class UsuariosRouter {
  public controlador: UsuariosController = new UsuariosController();

  public routes(app): void {
    /**
     * TODO: Ver como se puede asegurar el create de usuario dejándolo
     * público sin pasar por el middleware
     */
    app
      .route("/api/v1/usuarios")
      .get(mw.jwtAdminMiddleware, this.controlador.getAll)
      .post(mw.jwtAdminMiddleware, this.controlador.create);

    app
      .route("/api/v1/usuario/:id")
      .get(mw.jwtAdminMiddleware, this.controlador.get)
      .put(mw.jwtAdminMiddleware, this.controlador.update)
      .delete(mw.jwtAdminMiddleware, this.controlador.delete);

    app
      .route("/api/v1/usuarios/paginado")
      .get(mw.jwtAdminMiddleware, this.controlador.getPaginated);

    app
      .route("/api/v1/usuarios/paginado/filter")
      .get(mw.jwtAdminMiddleware, this.controlador.getPaginatedAndFilter);

    app
      .route("/api/v1/usuarios/recpass/:recpass")
      .get(mw.jwtAdminMiddleware, this.controlador.getByRecpass);

    app
      .route("/api/v1/usuario/updatepass/:id")
      .put(mw.jwtAdminMiddleware, this.controlador.updatePasswordUsuario);
  }
}
