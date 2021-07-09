import { Movimientos } from "../Entities/Movimientos";
import { getDiffDates } from "../helpers/getDiffDates";
import { Request, Response } from "express";
import { ApiResponse, STATUS_OK, STATUS_FAILED } from "../api/response";
const getDates: getDiffDates = new getDiffDates();

export class EstadisticasController {
  constructor() {}

  public getBetweenDates(req: Request, res: Response) {

    const from = req.body.from;
    const to = req.body.to;
    
    Movimientos.getBetweenDates(from, to)
      .then((data) => res.json(data))
      .catch((err) => console.log(err));
  }
  
  public getBetweenDatesGraph(req: Request, res: Response) {

    const from = req.body.from;
    const to = req.body.to;
    
    Movimientos.getBetweenDatesGraph(from, to)
      .then((data) => res.json(data))
      .catch((err) => console.log(err));
  }

  public dashboard(req: Request, res: Response) {}

  public async post(req: Request, res: Response) {
    const fc_month_ago = getDates.monthAgo();
    try {
      for (let i = 0; i < 200; i++) {
        const json = {
          fecha: fc_month_ago,
          estado: "c",
          modo_pago: "efectivo",
          // estado: "p",
          // modo_pago: "ctacte",
          comentario: "Prueba de Estadisticas",
          movimiento_lineas: [
            {
              id_producto: Math.floor(Math.random() * 250) + 1,
              cantidad: Math.floor(Math.random() * 3) + 1,
              unidad: 1,
              img: "string",
              nombre:
                'Jean Hombre Celeste medio "LEONARDO" semi elastizado T38 a T48',
              descripcion: "",
              precio_venta: Math.floor(Math.random() * 20000) + 1,
              precio_oferta: 0,
              oferta: false,
            },
          ],
          saldo: 0, // efectivo -> completado
          pagos: [], // efectivo -> completado
          // saldo: Math.floor(Math.random() * 20000) + 1, // ctacte = pendiente
          // pagos: [{ monto: Math.floor(Math.random() * 20000) + 1 }], // ctacte = pendiente
          cliente: {
            id: Math.floor(Math.random() * 1000) + 1,
          },
          total: Math.floor(Math.random() * 20000) + 1,
        };
        const movimiento = Movimientos.create({ ...json } as Object);
        await movimiento.save();
      }
      res.json({ termino: "ok" });
    } catch (error) {
      console.log(error);
    }
  }

  public getPaginated(req: Request, res: Response) {
    const pageNro: any = req.query.pageNro || 0;
    const pageSize: any = req.query.pageSize || 10;

    Movimientos.getPaginated(pageNro, pageSize)
      .then((data) => ApiResponse(res, STATUS_OK, data, []))
      .catch((err) => ApiResponse(res, STATUS_FAILED, [], err));
  }
}
