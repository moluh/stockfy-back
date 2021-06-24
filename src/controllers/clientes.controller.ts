import { Clientes } from "../Entities/Clientes";
import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";
import { ApiResponse, STATUS_FAILED, STATUS_OK } from "../api/response";

export class ClientesController {
  constructor() {}

  public getAll(req: Request, res: Response) {
    Clientes.find({
      order: { nombre: "ASC" },
    })
      .then((data) => ApiResponse(res, STATUS_OK, data, []))
      .catch((err) => ApiResponse(res, STATUS_FAILED, [], err));
  }

  public async create(req: Request, res: Response) {
    let cliente: Clientes = new Clientes();
    let email = req.body.email;
    let username = req.body.username;
    let telefono = req.body.telefono;
    let fc_alta = new Date();
    cliente.email = email;
    cliente.telefono = telefono;
    cliente.created_at = fc_alta;
    cliente.updated_at = fc_alta;

    cliente.nombre = req.body.nombre;
    cliente.apellido = req.body.apellido;
    cliente.avatar = req.body.avatar;
    cliente.domicilio = req.body.domicilio;

    await new Promise<void>((resolve, reject) => {
      Clientes.findOne({ email })
        .then((client) => {
          if (client === undefined) {
            resolve();
          } else if (client.email === null || client.email === "") {
            resolve();
          } else {
            ApiResponse(
              res,
              STATUS_FAILED,
              [],
              "El email ya se encuentra registrado."
            );
            reject();
          }
        })
        .catch((err) => {
          reject(ApiResponse(res, STATUS_FAILED, [], err.message));
        });
    });

    await new Promise<void>((resolve, reject) => {
      Clientes.findOne({ telefono })
        .then((client) => {
          if (client === undefined) {
            resolve();
          } else if (client.telefono === null || client.telefono === "") {
            resolve();
          } else {
            ApiResponse(
              res,
              STATUS_FAILED,
              [],
              "El número de teléfono ya se encuentra registrado."
            );
            reject();
          }
        })
        .catch((err) => {
          reject(ApiResponse(res, STATUS_FAILED, [], err.message));
        });
    });

    cliente
      .save()
      .then((data) => ApiResponse(res, STATUS_OK, data, []))
      .catch((err) => ApiResponse(res, STATUS_FAILED, [], err));
  }

  public async update(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    let email = req.body.email;
    let username = req.body.username;
    let telefono = req.body.telefono;
    let fecha = new Date();

    let cliente = await Clientes.findOne({ id });
    cliente.nombre = req.body.nombre;
    cliente.apellido = req.body.apellido;
    cliente.domicilio = req.body.domicilio;
    cliente.avatar = req.body.avatar;
    cliente.activo = req.body.activo;
    cliente.updated_at = fecha;

    if (cliente.email !== email) {
      await new Promise<void>((resolve, reject) => {
        Clientes.findOne({ email })
          .then((u) => {
            if (u) {
              res.json("El email ya se encuentra registrado.");
            } else {
              cliente.email = email;
              resolve();
            }
          })
          .catch((err) => {
            res.json(err.message);
            reject();
          });
      });
    }

    if (cliente.telefono !== telefono) {
      await new Promise<void>((resolve, reject) => {
        Clientes.findOne({ telefono })
          .then((u) => {
            if (u) {
              res.json("El número de teléfono ya se encuentra registrado.");
            } else {
              cliente.telefono = telefono;
              resolve();
            }
          })
          .catch((err) => {
            res.json(err.message);
            reject();
          });
      });
    }

    cliente
      .save()
      .then((data) => ApiResponse(res, STATUS_OK, data, []))
      .catch((err) => ApiResponse(res, STATUS_FAILED, [], err));
  }

  public async getPaginated(req: Request, res: Response) {
    let pageNro: any = req.query.pageNro;
    let pageSize: any = req.query.pageSize;

    Clientes.getPaginated(pageNro, pageSize)
      .then(({ data, count }) => ApiResponse(res, STATUS_OK, data, [], count))
      .catch((err) => ApiResponse(res, STATUS_FAILED, [], err));
  }

  public async getPaginatedAndFilter(req: Request, res: Response) {
    const pageNro: any = req.query.pageNro;
    const pageSize: any = req.query.pageSize;
    const attribute: any = req.query.attribute || "nombre";
    const text: any = req.query.text || "";
    const isActive: any = req.query.isActive;

    Clientes.getPaginatedAndFilter(pageNro, pageSize, attribute, text, isActive)
      .then(({ data, count }) => ApiResponse(res, STATUS_OK, data, [], count))
      .catch((err) => ApiResponse(res, STATUS_FAILED, [], err));
  }

  public delete(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    Clientes.findOne({ id })
      .then((cliente) => {
        cliente
          .remove()
          .then((data) => ApiResponse(res, STATUS_OK, data, []))
          .catch((err) => ApiResponse(res, STATUS_FAILED, [], err));
      })
      .catch((err) => ApiResponse(res, STATUS_FAILED, [], err));
  }

  public get(req: Request, res: Response, idUser?: number) {
    const id: number = parseInt(req.params.id);

    Clientes.findOne({ id })
      .then((data) => ApiResponse(res, STATUS_OK, data, []))
      .catch((err) => ApiResponse(res, STATUS_FAILED, [], err));
  }
}
