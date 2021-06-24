import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { UsuariosController } from "../controllers/usuarios.controller";

export const ctlUsuario: UsuariosController = new UsuariosController();

export function jwtAdminMidleware(req: Request, res: Response, next) {
  next()
}

export function jwtEmpleadoMidleware(req: Request, res: Response, next) {
  next()
}

export function DESCOMENTARjwtAdminMidleware(req: Request, res: Response, next) {
  const authString = req.headers["authorization"];

  if (typeof authString === "string" && authString.indexOf(" ") > -1) {
    const authArray = authString.split(" ");
    const token = authArray[1];
    jwt.verify(token, process.env.PKEY, async (err, decoded: any) => {
      if (err) {
        res.status(403).send({
          ok: false,
          msg: "Token no válido: No tiene autorización para este recurso",
          error: err,
        });
      } else {
        // comprobamos que el usuario sea realmente el que esta haciendo la peticion
        // y que no se haya modificado el rol
        // let user: Usuarios;
        // await Usuarios.findById(decoded.id)
        //   .then(u => user = u)
        //   .catch(err => { return res.json({ err }) });
        if (decoded.role === "ADMIN") {
          // 1 = rol ADMIN
          next();
        } else {
          res.status(403).send({
            ok: false,
            msg: "Token no válido: No tiene autorización para este recurso",
            error: err,
          });
        }
      }
    });
  } else {
    res.status(403).send({
      ok: false,
      msg: "Token no válido: No tiene autorización para este recurso",
    });
  }
}

export function DESCOMENTARjwtEmpleadoMidleware(req: Request, res: Response, next) {
  const authString = req.headers["authorization"];

  if (typeof authString === "string" && authString.indexOf(" ") > -1) {
    const authArray = authString.split(" ");
    const token = authArray[1];
    jwt.verify(token, process.env.PKEY, async (err, decoded: any) => {
      if (err) {
        res.status(403).send({
          ok: false,
          msg: "Token no válido: No tiene autorización para este recurso",
          error: err,
        });
      } else {
        console.log("decoded.role", decoded.role);

        if (decoded.role === "EMPLEADO" || decoded.role === "ADMIN") {
          next();
        } else {
          res.status(403).send({
            ok: false,
            msg: "Token no válido: No tiene autorización para este recurso",
            error: err,
          });
        }
      }
    });
  } else {
    res.status(403).send({
      ok: false,
      msg: "Token no válido: No tiene autorización para este recurso",
    });
  }
}
