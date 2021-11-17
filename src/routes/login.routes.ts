import { Request, Response, NextFunction } from "express";
import { UsuariosAuthController } from "../auth/auth.users.controller";
import * as mw from "../auth/auth.middleware";

export class LoginRoutes {
  public controlador: UsuariosAuthController = new UsuariosAuthController();

  public routes(app): void {
    app.route("/api/v1/login").post(this.controlador.loginUsuario);
  }
}
