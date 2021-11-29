import { MovimientosLineas } from '../Entities/MovimientosLineas';
import { Request, Response } from 'express';
import { ApiResponse } from '../api/response';

export class MovimientosLineasController {

    constructor() {
    }

    public async getAll(req: Request, res: Response) {
        await MovimientosLineas.find(
            {
                order: { nombre: "ASC" },
                // relations: ['pedido']
            })
            .then(data => ApiResponse(res, true, 200, data, []))
            .catch(err => ApiResponse(res, false, 400, [], err));

    }

    public async get(req: Request, res: Response) {
        let id = parseInt(req.params.id)
        await MovimientosLineas.findOne(
            { id }
        )
            .then(data => ApiResponse(res, true, 200, data, []))
            .catch(err => ApiResponse(res, false, 400, [], err));

    }

    public create(req: Request, res: Response) {
        let pedido = MovimientosLineas.create({ ...req.body } as Object);
        pedido.save()
            .then(data => ApiResponse(res, true, 200, data, []))
            .catch(err => ApiResponse(res, false, 400, [], err));
    };

    public update(req: Request, res: Response) {
        let id = parseInt(req.params.id)
        MovimientosLineas.findOne({ id })
            .then(pedido => {
                pedido.id_producto = req.body.id_producto;
                pedido.cantidad = req.body.cantidad;
                pedido.nombre = req.body.nombre;
                pedido.descripcion = req.body.descripcion;
                pedido.precio_venta = req.body.precio_venta;
                pedido.precio_oferta = req.body.precio_oferta;
                pedido.oferta = req.body.oferta;
                pedido.save()
                    .then(data => ApiResponse(res, true, 200, data, []))
                    .catch(err => ApiResponse(res, false, 400, [], err));
            })
            .catch(err => ApiResponse(res, false, 400, [], err));
    }

    public delete(req: Request, res: Response) {
        let id = parseInt(req.params.id)
        MovimientosLineas.findOne({ id })
            .then(pedido => {
                pedido.remove()
                    .then(data => ApiResponse(res, true, 200, data, []))
                    .catch(err => ApiResponse(res, false, 400, [], err));
            })
            .catch(err => ApiResponse(res, false, 400, [], err));
    };


}
