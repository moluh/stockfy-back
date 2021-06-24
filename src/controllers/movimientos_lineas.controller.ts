import { MovimientosLineas } from '../Entities/MovimientosLineas';
import { Request, Response } from 'express';
import { ApiResponse, STATUS_OK, STATUS_FAILED } from '../api/response';

export class MovimientosLineasController {

    constructor() {
    }

    public async getAll(req: Request, res: Response) {
        await MovimientosLineas.find(
            {
                order: { nombre: "ASC" },
                // relations: ['pedido']
            })
            .then(data => ApiResponse(res, STATUS_OK, data, []))
            .catch(err => ApiResponse(res, STATUS_FAILED, [], err));

    }

    public async get(req: Request, res: Response) {
        let id = parseInt(req.params.id)
        await MovimientosLineas.findOne(
            { id }
        )
            .then(data => ApiResponse(res, STATUS_OK, data, []))
            .catch(err => ApiResponse(res, STATUS_FAILED, [], err));

    }

    public create(req: Request, res: Response) {
        let pedido = MovimientosLineas.create({ ...req.body } as Object);
        pedido.save()
            .then(data => ApiResponse(res, STATUS_OK, data, []))
            .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
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
                    .then(data => ApiResponse(res, STATUS_OK, data, []))
                    .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
            })
            .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
    }

    public delete(req: Request, res: Response) {
        let id = parseInt(req.params.id)
        MovimientosLineas.findOne({ id })
            .then(pedido => {
                pedido.remove()
                    .then(data => ApiResponse(res, STATUS_OK, data, []))
                    .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
            })
            .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
    };


}
