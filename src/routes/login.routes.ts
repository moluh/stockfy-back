import { Request, Response, NextFunction } from "express";
import { UsuariosAuthController } from "../controllers/auth_usuarios.controller";
import * as mw from "./auth_mw";

export class LoginRoutes {
  public controlador: UsuariosAuthController = new UsuariosAuthController();

  public routes(app): void {
    app.route("/api/v1/login").post(this.controlador.loginUsuario);
  }
}
