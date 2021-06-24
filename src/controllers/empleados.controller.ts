import { Empleados } from "../Entities/Empleados";
import { Request, Response } from "express";
import * as faker from "faker";
import { ApiResponse, STATUS_FAILED, STATUS_OK } from "../api/response";

export class EmpleadosController {

  constructor() { }

  public getAll(req: Request, res: Response) {
    Empleados.find({
      order: { nombre: "ASC" },
    })
      .then(data => ApiResponse(res, STATUS_OK, data, []))
      .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
  }

  public get(req: Request, res: Response, idUser?: number) {
    const id: number = parseInt(req.params.id);

    Empleados.findOne({ id })
      .then(data => ApiResponse(res, STATUS_OK, data, []))
      .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
  }

  public async create(req: Request, res: Response) {
    let empleado: Empleados = new Empleados();
    let email = req.body.email;
    let telefono = req.body.telefono;
    let fc_alta = new Date();

    empleado.role = 3;
    empleado.email = email;
    empleado.telefono = telefono;
    empleado.created_at = fc_alta;
    empleado.updated_at = fc_alta;
    
    empleado.nombre = req.body.nombre;
    empleado.apellido = req.body.apellido;
    empleado.avatar = req.body.avatar;
    empleado.domicilio = req.body.domicilio;

    await new Promise<void>((resolve, reject) => {
      Empleados.findOne({ email })
        .then((u) => {
          if (u) res.json("El email ya se encuentra registrado.");
          else resolve();
        })
        .catch((err) => reject(res.json(err.message)));
    });

    await new Promise<void>((resolve, reject) => {
      Empleados.findOne({ telefono })
        .then((u) => {
          if (u) res.json("El número de teléfono ya se encuentra registrado.");
          else resolve();
        })
        .catch((err) => reject(res.json(err.message)));
    });

    empleado
      .save()
      .then(data => ApiResponse(res, STATUS_OK, data, []))
      .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
  }

  public async update(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    let email = req.body.email;
    let telefono = req.body.telefono;
    let fecha = new Date();

    let empleado = await Empleados.findOne({ id });
    empleado.nombre = req.body.nombre;
    empleado.apellido = req.body.apellido;
    empleado.domicilio = req.body.domicilio;
    empleado.recpass = null;
    empleado.avatar = req.body.avatar;
    empleado.activo = req.body.activo;
    empleado.updated_at = fecha;

    if (empleado.email !== email) {
      await new Promise<void>((resolve, reject) => {
        Empleados.findOne({ email })
          .then((u) => {
            if (u) {
              res.json("El email ya se encuentra registrado.");
            } else {
              empleado.email = email;
              resolve();
            }
          })
          .catch((err) => reject(res.json(err.message)));
      });
    }

    if (empleado.telefono !== telefono) {
      await new Promise<void>((resolve, reject) => {
        Empleados.findOne({ telefono })
          .then((u) => {
            if (u) {
              res.json("El número de teléfono ya se encuentra registrado.");
            } else {
              empleado.telefono = telefono;
              resolve();
            }
          })
          .catch((err) => {
            res.json(err.message);
            reject();
          });
      });
    }

    empleado
      .save()
      .then(data => ApiResponse(res, STATUS_OK, data, []))
      .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
  }

  public delete(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    Empleados.findOne({ id })
      .then((empleado) => {
        empleado
          .remove()
          .then(data => ApiResponse(res, STATUS_OK, data, []))
          .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
      })
      .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
  }

  public async findByTxtPaginated(req: Request, res: Response) {
    let pageNro: any = req.query.pageNro;
    let pageSize: any = req.query.pageSize;
    let filter: any = req.query.filter || "";
    let attr: any = req.query.attr || "nombre"; // columna por la cual filtrar

    Empleados.findByTxtPaginated(pageNro, pageSize, attr, filter)
      .then(data => ApiResponse(res, STATUS_OK, data, []))
      .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
  }

  public findByRolePaginated(req: Request, res: Response) {
    let pageNro: any = req.query.pageNro;
    let pageSize: any = req.query.pageSize;
    let role = req.params.id;

    Empleados.findByRolePaginated(pageNro, pageSize, role)
      .then(data => ApiResponse(res, STATUS_OK, data, []))
      .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
  }
}
