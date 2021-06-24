import { Movimientos } from "../Entities/Movimientos";
import { getDiffDates } from "../helpers/getDiffDates";
import { Request, Response } from "express";
import { ApiResponse, STATUS_OK, STATUS_FAILED } from "../api/response";
const getDates: getDiffDates = new getDiffDates();

export class EstadisticasController {
  constructor() {}

  public getBetweenDates(req: Request, res: Response) {
    res.json({
      actualDate: getDates.actualDate(),
      currentTime: getDates.currentTime(),
      monthAgo: getDates.monthAgo(),
      yesterday: getDates.yesterday(),
    });
  }

  public dashboard(req: Request, res: Response) {}

  public async post(req: Request, res: Response) {
    const json = {
      estado: "p",
      movimiento_lineas: [
        {
          id_producto: 287,
          cantidad: 2,
          unidad: 1,
          img: "string",
          nombre:
            'Jean Hombre Celeste medio "LEONARDO" semi elastizado T38 a T48',
          descripcion: "",
          precio_venta: 5783,
          precio_oferta: 0,
          oferta: false,
        },
      ],
      saldo: 64564,
      pagos: [{ monto: 3442 }],
      cliente: {
        id: 11,
        nombre: "Dario",
        apellido: "Kess",
        provincia: null,
        localidad: null,
        avatar: null,
        telefono: null,
        domicilio: null,
        email: null,
        created_at: null,
        updated_at: null,
        activo: true,
      },
      total: 45345,
      comentario: "DASDASDA",
      modo_pago: "ctacte",
    };
    try {
      for (let i = 0; i < 1000; i++) {
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
