import { Movimientos } from "../entities/Movimientos";
import { Request, Response } from "express";
import { ProductosController } from "./productos.controller";
import { ApiResponse } from "../api/response";
import { PagosController } from "./pagos.controller";
import { Pagos } from "../entities/Pagos";

export class MovimientosController {
  constructor() { }

  public getAll(req: Request, res: Response) {
    Movimientos.find({
      order: { fecha: "ASC" },
      relations: ["cliente", "movimiento_lineas", "pagos"],
    })
      .then((data) => ApiResponse(res, true, 200, data, []))
      .catch((err) => ApiResponse(res, false, 400, [], err));
  }

  public get(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    Movimientos.findOne(
      { id },
      { relations: ["cliente", "movimiento_lineas", "pagos"] }
    )
      .then((data) => ApiResponse(res, true, 200, data, []))
      .catch((err) => ApiResponse(res, false, 400, [], err));
  }

  public getPaginated(req: Request, res: Response) {
    let pageNro: any = req.query.pageNro || 0;
    let pageSize: any = req.query.pageSize;
    Movimientos.getPaginated(pageNro, pageSize)
      .then(({ data, count }) => ApiResponse(res, true, 200, data, [], count))
      .catch((err) => ApiResponse(res, false, 400, [], err));
  }

  public getPaginatedAndFilter(req: Request, res: Response) {
    let pageNro: any = req.query.pageNro || 0;
    let pageSize: any = req.query.pageSize;
    let attr: any = req.query.attr;
    let txt: any = req.query.txt;
    Movimientos.getPaginatedAndFilter(pageNro, pageSize, attr, txt)
      .then(({ data, count }) => ApiResponse(res, true, 200, data, [], count))
      .catch((err) => ApiResponse(res, false, 400, [], err));
  }

  getPaginatedByClientId(req: Request, res: Response) {
    let pageNro: any = req.query.pageNro || 0;
    let pageSize: any = req.query.pageSize;
    let clientId: any = req.params.clientId;
    Movimientos.getPaginatedByClientId(pageNro, pageSize, clientId)
      .then(({ data, count }) => ApiResponse(res, true, 200, data, [], count))
      .catch((err) => ApiResponse(res, false, 400, [], err));
  }

  getPaginatedByDate(req: Request, res: Response) {
    let pageNro: any = req.query.pageNro || 0;
    let pageSize: any = req.query.pageSize;
    let date: any = req.params.date;
    Movimientos.getPaginatedByDate(pageNro, pageSize, date)
      .then(({ data, count }) => ApiResponse(res, true, 200, data, [], count))
      .catch((err) => ApiResponse(res, false, 400, [], err));
  }

  getPaginatedBetweenDates(req: Request, res: Response) {
    let pageNro: any = req.query.pageNro || 0;
    let pageSize: any = req.query.pageSize;
    let from: any = req.params.from;
    let to: any = req.params.to;
    Movimientos.getPaginatedBetweenDates(pageNro, pageSize, from, to)
      .then(({ data, count }) => ApiResponse(res, true, 200, data, [], count))
      .catch((err) => ApiResponse(res, false, 400, [], err));
  }

  public async create(req: Request, res: Response) {
    let prodCtrl = new ProductosController();
    let pagosCtrl = new PagosController();
    const movimiento = Movimientos.create({ ...req.body } as Object);

    for (let i of movimiento.movimiento_lineas) {
      await prodCtrl.updateStockProducto(i);
    }

    if (movimiento.pagos.length > 0)
      movimiento.saldo = movimiento.total - movimiento.pagos[0].monto;

    movimiento
      .save()
      .then(async (movement) => {
        // Checkeamos si se mando con un array de pago para
        // crear el pago relacionado al nuevo movimiento
        if (movimiento.pagos.length > 0) {
          const resp = await pagosCtrl.createAfterMovement(movement);
          if (resp)
            ApiResponse(res, true, 200, resp, []);
          else
            ApiResponse(res, false, 400, [], "Ocurrió un error al cargar el pago al movimiento.");
        } else ApiResponse(res, true, 200, movement, []);
      })
      .catch((err) => ApiResponse(res, false, 400, [], err));
  }

  public async updateBalance(pago: Pagos, action: string): Promise<any> {
    const movement_id: any = pago.movimiento;
    return new Promise((resolve) => {
      Movimientos.findOne({ id: movement_id }).then((mov) => {
        const movement = Movimientos.create({ ...mov } as Object);

        if (action === "create") {
          if (movement.saldo === null || movement.saldo === 0)
            movement.saldo = movement.total - pago.monto;
          else movement.saldo = movement.saldo - pago.monto;

        } else if (action === "delete") {
          movement.saldo = movement.saldo + pago.monto;
        }

        if (movement.saldo <= 0) movement.estado = "COMPLETADO";
        else movement.estado = "PENDIENTE";

        movement
          .save()
          .then((data) => resolve({ ok: true, data }))
          .catch((err) => resolve({ ok: false, data: err }));
      });
    });
  }

  public update(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    Movimientos.findOne({ id })
      .then((movimiento) => {
        movimiento.fecha = req.body.fecha;
        movimiento.hora = req.body.hora;
        movimiento.comentario = req.body.comentario;
        movimiento.estado = req.body.estado;
        movimiento.total = req.body.total;
        movimiento.modo_pago = req.body.modo_pago;
        movimiento.saldo = req.body.saldo;
        movimiento.usuario = req.body.usuario;
        movimiento.pagos = req.body.pagos;
        movimiento.movimiento_lineas = req.body.movimiento_lineas;
        movimiento
          .save()
          .then((data) => ApiResponse(res, true, 200, data, []))
          .catch((err) => ApiResponse(res, false, 400, [], err));
      })
      .catch((err) => ApiResponse(res, false, 400, [], err));
  }

  public delete(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    Movimientos.findOne({ id })
      .then((movimiento) => {
        movimiento
          .remove()
          .then((data) => ApiResponse(res, true, 200, data, []))
          .catch((err) => ApiResponse(res, false, 400, [], err));
      })
      .catch((err) => ApiResponse(res, false, 400, [], err));
  }

  public changeState(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    let state: string = req.params.state;

    Movimientos.findOne({ id })
      .then((movimiento) => {
        movimiento.estado = state;
        movimiento
          .save()
          .then((data) => ApiResponse(res, true, 200, data, []))
          .catch((err) => ApiResponse(res, false, 400, [], err));
      })
      .catch((err) => ApiResponse(res, false, 400, [], err));
  }
}
