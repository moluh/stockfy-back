import { Modulos } from "../entities/Modulos";
import { Request, Response } from "express";
import { ApiResponse } from "../api/response";

export class ModulosController {

  constructor() { }

  public getAll(req: Request, res: Response) {
    Modulos.find({ order: { modulo: "ASC" }, relations: ["permiso"] })
      .then(data => ApiResponse(res, true, 200, data, []))
      .catch(err => ApiResponse(res, false, 400, [], err));
  }

  public get(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    Modulos.findOne({ id })
      .then(data => ApiResponse(res, true, 200, data, []))
      .catch(err => ApiResponse(res, false, 400, [], err));
  }

  public getPaginated(req: Request, res: Response) {
    const pageNro: any = req.query.pageNro || 0;
    const pageSize: any = req.query.pageSize || 10;

    Modulos.getModulosPaginated(pageNro, pageSize)
      .then(data => ApiResponse(res, true, 200, data, []))
      .catch(err => ApiResponse(res, false, 400, [], err));
  }

  public create(req: Request, res: Response) {
    const modulo = new Modulos();
    modulo.modulo = req.body.modulo;
    modulo
      .save()
      .then(data => ApiResponse(res, true, 200, data, []))
      .catch(err => ApiResponse(res, false, 400, [], err));
  }

  public update(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    Modulos.findOne({ id })
      .then((modulo) => {
        modulo.modulo = req.body.modulo;
        modulo.activo = req.body.activo;
        modulo
          .save()
          .then(data => ApiResponse(res, true, 200, data, []))
          .catch(err => ApiResponse(res, false, 400, [], err));
      })
      .catch(err => ApiResponse(res, false, 400, [], err));
  }

  public delete(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    Modulos.findOne({ id })
      .then((modulo) => {
        modulo
          .remove()
          .then(data => ApiResponse(res, true, 200, data, []))
          .catch(err => ApiResponse(res, false, 400, [], err));
      })
      .catch(err => ApiResponse(res, false, 400, [], err));
  }

}
