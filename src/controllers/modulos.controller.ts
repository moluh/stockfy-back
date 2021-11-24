import { Modulos } from "../Entities/Modulos";
import { Request, Response } from "express";
import { ApiResponse, STATUS_OK, STATUS_FAILED } from "../api/response";

export class ModulosController {

  constructor() { }

  public getAll(req: Request, res: Response) {
    Modulos.find({ order: { modulo: "ASC" }, relations: ["permiso"] })
      .then(data => ApiResponse(res, STATUS_OK, data, []))
      .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
  }

  public get(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    Modulos.findOne({ id })
      .then(data => ApiResponse(res, STATUS_OK, data, []))
      .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
  }

  public getPaginated(req: Request, res: Response) {
    const pageNro: any = req.query.pageNro || 0;
    const pageSize: any = req.query.pageSize || 10;

    Modulos.getModulosPaginated(pageNro, pageSize)
      .then(data => ApiResponse(res, STATUS_OK, data, []))
      .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
  }

  public create(req: Request, res: Response) {
    const modulo = new Modulos();
    modulo.modulo = req.body.modulo;
    modulo
      .save()
      .then(data => ApiResponse(res, STATUS_OK, data, []))
      .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
  }

  public update(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    Modulos.findOne({ id })
      .then((modulo) => {
        modulo.modulo = req.body.modulo;
        modulo.activo = req.body.activo;
        modulo.role = req.body.role;
        modulo.permiso = req.body.permiso;
        modulo
          .save()
          .then(data => ApiResponse(res, STATUS_OK, data, []))
          .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
      })
      .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
  }

  public delete(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    Modulos.findOne({ id })
      .then((modulo) => {
        modulo
          .remove()
          .then(data => ApiResponse(res, STATUS_OK, data, []))
          .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
      })
      .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
  }

}
