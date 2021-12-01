import { Proveedores } from "../entities/Proveedores";
import { Request, Response } from "express";
import { ApiResponse } from "../api/response";

export class ProveedoresController {
  constructor() { }

  public getAll(req: Request, res: Response) {
    Proveedores.find({ order: { proveedor: "ASC" } })
      .then(data => ApiResponse(res, true, 200, data, []))
      .catch(err => ApiResponse(res, false, 400, [], err));
  }

  public get(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    Proveedores.findOne({ id })
      .then(data => ApiResponse(res, true, 200, data, []))
      .catch(err => ApiResponse(res, false, 400, [], err));
  }

  public getPaginated(req: Request, res: Response) {
    const pageNro: any = req.query.pageNro || 0;
    const pageSize: any = req.query.pageSize || 10;

    Proveedores.getProveedoresPaginated(pageNro, pageSize)
      .then(data => ApiResponse(res, true, 200, data, []))
      .catch(err => ApiResponse(res, false, 400, [], err));
  }

  public create(req: Request, res: Response) {
    const proveedor = new Proveedores();
    proveedor.proveedor = req.body.proveedor;
    proveedor
      .save()
      .then(data => ApiResponse(res, true, 200, data, []))
      .catch(err => ApiResponse(res, false, 400, [], err));
  }

  public update(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    Proveedores.findOne({ id })
      .then((proveedor) => {
        proveedor.proveedor = req.body.proveedor;
        proveedor
          .save()
          .then(data => ApiResponse(res, true, 200, data, []))
          .catch(err => ApiResponse(res, false, 400, [], err));
      })
      .catch(err => ApiResponse(res, false, 400, [], err));
  }

  public delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    Proveedores.findOne({ id })
      .then((proveedor) => {
        proveedor
          .remove()
          .then(data => ApiResponse(res, true, 200, data, []))
          .catch(err => ApiResponse(res, false, 400, [], err));
      })
      .catch(err => ApiResponse(res, false, 400, [], err));
  }
}
