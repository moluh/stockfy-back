import { Request, Response, NextFunction } from "express";
import { UsuariosController } from "../controllers/usuarios.controller";
import * as mw from "../auth/auth.middleware";
import { SUPERADMIN } from "../helpers/roles";

export class UsuariosRouter {
  public controlador: UsuariosController = new UsuariosController();

  public routes(app): void {
    /**
     * TODO: Ver como se puede asegurar el create de usuario dejándolo
     * público sin pasar por el middleware
     */
    app
      .route("/api/v1/usuarios")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.getAll)
      .post(mw.isAllowed([SUPERADMIN]), this.controlador.create);

    app
      .route("/api/v1/usuario/:id")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.get)
      .put(mw.isAllowed([SUPERADMIN]), this.controlador.update)
      .delete(mw.isAllowed([SUPERADMIN]), this.controlador.delete);

    app
      .route("/api/v1/usuarios/paginado")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.getPaginated);

    app
      .route("/api/v1/usuarios/paginado/filter")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.getPaginatedAndFilter);

    app
      .route("/api/v1/usuarios/recpass/:recpass")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.getByRecpass);

    app
      .route("/api/v1/usuario/updatepass/:id")
      .put(mw.isAllowed([SUPERADMIN]), this.controlador.updatePasswordUsuario);
  }
}
