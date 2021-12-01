import { Marcas } from "../entities/Marcas";
import { Request, Response } from "express";
import { ApiResponse } from "../api/response";

export class MarcasController {

  constructor() { }

  public getAll(req: Request, res: Response) {
    Marcas.find({ order: { marca: "ASC" } })
      .then(data => ApiResponse(res, true, 200, data, []))
      .catch(err => ApiResponse(res, false, 400, [], err));
  }

  public get(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    Marcas.findOne({ id })
      .then(data => ApiResponse(res, true, 200, data, []))
      .catch(err => ApiResponse(res, false, 400, [], err));
  }

  public getPaginated(req: Request, res: Response) {
    const pageNro: any = req.query.pageNro || 0;
    const pageSize: any = req.query.pageSize || 10;

    Marcas.getMarcasPaginated(pageNro, pageSize)
      .then(data => ApiResponse(res, true, 200, data, []))
      .catch(err => ApiResponse(res, false, 400, [], err));
  }

  public create(req: Request, res: Response) {
    const marca = new Marcas();
    marca.marca = req.body.marca;
    marca
      .save()
      .then(data => ApiResponse(res, true, 200, data, []))
      .catch(err => ApiResponse(res, false, 400, [], err));
  }

  public update(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    Marcas.findOne({ id })
      .then((marca) => {
        marca.marca = req.body.marca;
        marca
          .save()
          .then(data => ApiResponse(res, true, 200, data, []))
          .catch(err => ApiResponse(res, false, 400, [], err));
      })
      .catch(err => ApiResponse(res, false, 400, [], err));
  }

  public delete(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    Marcas.findOne({ id })
      .then((marca) => {
        marca
          .remove()
          .then(data => ApiResponse(res, true, 200, data, []))
          .catch(err => ApiResponse(res, false, 400, [], err));
      })
      .catch(err => ApiResponse(res, false, 400, [], err));
  }

}
