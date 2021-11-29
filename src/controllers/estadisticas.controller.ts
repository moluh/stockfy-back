import { Movimientos } from "../Entities/Movimientos";
import { getDiffDates } from "../helpers/getDiffDates";
import { Request, Response } from "express";
import { ApiResponse } from "../api/response";
const getDates: getDiffDates = new getDiffDates();

export class EstadisticasController {
  constructor() {}

  public getBetweenDates(req: Request, res: Response) {
    const from = req.body.from;
    const to = req.body.to;

    Movimientos.getStatisticsBetweenDates(from, to)
      .then((data) => ApiResponse(res, true, 200, data, []))
      .catch((err) => ApiResponse(res, false, 400, [], err));
  }

  public getBetweenDatesGraphic(req: Request, res: Response) {
    const from = req.body.from;
    const to = req.body.to;

    Movimientos.getStatisticsBetweenDatesGraphic(from, to)
      .then((data) => ApiResponse(res, true, 200, data, []))
      .catch((err) => ApiResponse(res, false, 400, [], err));
  }

  public dashboard(req: Request, res: Response) {}

}
