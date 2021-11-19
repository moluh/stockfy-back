import { Permisos } from "../Entities/Permisos";
import { Request, Response } from "express";
import { ApiResponse, STATUS_OK, STATUS_FAILED } from "../api/response";

export class PermisosController {

  constructor() { }

  public getAll(req: Request, res: Response) {
    Permisos.find({ order: { permiso: "ASC" } })
      .then(data => ApiResponse(res, STATUS_OK, data, []))
      .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
  }

  public get(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    Permisos.findOne({ id })
      .then(data => ApiResponse(res, STATUS_OK, data, []))
      .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
  }

  public getPaginated(req: Request, res: Response) {
    const pageNro: any = req.query.pageNro || 0;
    const pageSize: any = req.query.pageSize || 10;

    Permisos.getPermisosPaginated(pageNro, pageSize)
      .then(data => ApiResponse(res, STATUS_OK, data, []))
      .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
  }

  public create(req: Request, res: Response) {
    const permiso = new Permisos();
    permiso.permiso = req.body.permiso;
    permiso
      .save()
      .then(data => ApiResponse(res, STATUS_OK, data, []))
      .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
  }

  public update(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    Permisos.findOne({ id })
      .then((permiso) => {
        permiso.permiso = req.body.permiso;
        permiso
          .save()
          .then(data => ApiResponse(res, STATUS_OK, data, []))
          .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
      })
      .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
  }

  public delete(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    Permisos.findOne({ id })
      .then((permiso) => {
        permiso
          .remove()
          .then(data => ApiResponse(res, STATUS_OK, data, []))
          .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
      })
      .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
  }

}
