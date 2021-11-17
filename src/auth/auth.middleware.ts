import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export function jwtAdminMiddleware(req: Request, res: Response, next) {
  next();
}

export function jwtEmpleadoMiddleware(req: Request, res: Response, next) {
  next();
}

export function QUITAR_ESTO_jwtAdminMiddleware(
  req: Request,
  res: Response,
  next
) {
  const authString = req.headers["authorization"];

  if (typeof authString === "string" && authString.indexOf(" ") > -1) {
    const authArray = authString.split(" ");
    const token = authArray[1];
    jwt.verify(token, process.env.PKEY, async (err, decoded: any) => {
      if (err)
        res.status(403).send({
          ok: false,
          msg: "Token no válido: No tiene autorización para este recurso",
          error: err,
        });
      else if (decoded.role === "ADMIN") next();
    });
  } else {
    res.status(403).send({
      ok: false,
      msg: "Token no válido.",
    });
  }
}

export function QUITAR_ESTO_jwtEmpleadoMiddleware(
  req: Request,
  res: Response,
  next
) {
  const authString = req.headers["authorization"];

  if (typeof authString === "string" && authString.indexOf(" ") > -1) {
    const authArray = authString.split(" ");
    const token = authArray[1];
    jwt.verify(token, process.env.PKEY, async (err, decoded: any) => {
      if (err)
        res.status(403).send({
          ok: false,
          msg: "Token no válido: No tiene autorización para este recurso",
          error: err,
        });
      else if (decoded.role === "EMPLEADO" || decoded.role === "ADMIN") next();
    });
  } else {
    res.status(403).send({
      ok: false,
      msg: "Token no válido.",
    });
  }
}
