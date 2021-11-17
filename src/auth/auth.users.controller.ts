import { Usuarios } from "../Entities/Usuarios";
import { Request, Response } from "express";
import { Config } from "../config/config";
const config: Config = new Config();
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export class UsuariosAuthController {

  constructor() { }

  public async loginUsuario(req: Request, res: Response) {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
    let telefono = req.body.telefono;
    let usuario: Usuarios;

    if (email) usuario = await Usuarios.findByEmail(email);
    if (telefono) usuario = await Usuarios.findByTelefono(telefono);
    if (username) usuario = await Usuarios.findByUsername(username);
    if (!usuario)
      // Si no encuentra el usuario
      return res.status(404).send({
        isLogged: false,
        token: null,
        error: "Datos incorrectos.",
      });

    let validatePassword = bcrypt.compareSync(password, usuario.password);

    if (!validatePassword) {
      // return res.status(401).send({ Error: "La contraseña no coincide."});
      return res.status(401).send({
        isLogged: false,
        token: null,
        error: "Datos incorrectos.",
      });
    }

    const useWithOutPass = { ...usuario };
    delete useWithOutPass.password;

    let token = jwt.sign(useWithOutPass, config.pkey, {
      expiresIn: config.jwtExp,
    });

    res.status(200).send({
      isLogged: true,
      token,
      expiresIn: config.jwtExp,
      role: useWithOutPass.role,
      activo: useWithOutPass.activo,
      // user: useWithOutPass
    });
  }
}
