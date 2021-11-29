import { Gastos } from "../Entities/Gastos";
import { Request, Response } from "express";
import { ApiResponse } from "../api/response";

export class GastosController {

  constructor() { }

  public getAll(req: Request, res: Response) {
    Gastos.find({ order: { fecha: "ASC" } })
      .then(data => ApiResponse(res, true, 200, data, []))
      .catch(err => ApiResponse(res, false, 400, [], err));
  }

  public get(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    Gastos.findOne({ id })
      .then(data => ApiResponse(res, true, 200, data, []))
      .catch(err => ApiResponse(res, false, 400, [], err));
  }

  public getPaginated(req: Request, res: Response) {
    const pageNro: any = req.query.pageNro || 0;
    const pageSize: any = req.query.pageSize || 10;

    Gastos.getPaginated(pageNro, pageSize)
      .then(data => ApiResponse(res, true, 200, data, []))
      .catch(err => ApiResponse(res, false, 400, [], err));
  }

  public create(req: Request, res: Response) {
    const gasto = Gastos.create({ ...req.body } as Object);
    gasto
      .save()
      .then(data => ApiResponse(res, true, 200, data, []))
      .catch(err => ApiResponse(res, false, 400, [], err));
  }

  public update(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    Gastos.findOne({ id })
      .then((gasto) => {
        gasto.descripcion = req.body.descripcion;
        gasto.fecha = req.body.fecha;
        gasto.monto = req.body.monto;
        gasto
          .save()
          .then(data => ApiResponse(res, true, 200, data, []))
          .catch(err => ApiResponse(res, false, 400, [], err));
      })
      .catch(err => ApiResponse(res, false, 400, [], err));
  }

  public delete(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    Gastos.findOne({ id })
      .then((gasto) => {
        gasto
          .remove()
          .then(data => ApiResponse(res, true, 200, data, []))
          .catch(err => ApiResponse(res, false, 400, [], err));
      })
      .catch(err => ApiResponse(res, false, 400, [], err));
  }

}
