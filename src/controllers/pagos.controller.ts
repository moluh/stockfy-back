import { Pagos } from '../entities/Pagos'
import e, { Request, Response } from 'express'
import { ApiResponse } from '../api/response'
import { Movimientos } from '../entities/Movimientos'
import { MovimientosController } from './movimientos.controller'

export class PagosController {
    constructor() {}

    public getAll(req: Request, res: Response) {
        Pagos.find({
            order: { fecha: 'ASC' },
            relations: ['movimiento'],
        })
            .then((data) => ApiResponse(res, true, 200, data, []))
            .catch((err) => ApiResponse(res, false, 400, [], err))
    }

    public get(req: Request, res: Response) {
        let id = parseInt(req.params.id)
        Pagos.findOne({ id })
            .then((data) => ApiResponse(res, true, 200, data, []))
            .catch((err) => ApiResponse(res, false, 400, [], err))
    }

    public getPaginated(req: Request, res: Response) {
        const pageNro: any = req.query.pageNro || 0
        const pageSize: any = req.query.pageSize || 10

        Pagos.getPaginated(pageNro, pageSize)
            .then((data) => ApiResponse(res, true, 200, data, []))
            .catch((err) => ApiResponse(res, false, 400, [], err))
    }

    public create(req: Request, res: Response) {
        const movCtrl: MovimientosController = new MovimientosController()
        const pago = Pagos.create({ ...req.body } as Object)
        pago.movimiento = req.body.movimientoId
        pago.save()
            .then(async (data) => {
                const response = await movCtrl.updateBalance(data, 'create')
                if (response.ok) ApiResponse(res, true, 200, data, [])
                else
                    ApiResponse(
                        res,
                        false,
                        400,
                        [],
                        'Error al actualizar el saldo.'
                    )
            })
            .catch((err) => ApiResponse(res, false, 400, [], err))
    }

    public createAfterMovement(movement: any) {
        const nuevo_pago = Pagos.create(movement.pagos[0] as Object)
        nuevo_pago.pago_nro = 1
        return new Promise((resolve) => {
            nuevo_pago.movimiento = movement.id
            nuevo_pago
                .save()
                .then((data) => resolve(true))
                .catch((err) => resolve(false))
        })
    }

    public update(req: Request, res: Response) {
        let id = parseInt(req.params.id)
        Pagos.findOne({ id })
            .then((pago) => {
                pago.monto = req.body.monto
                pago.fecha = req.body.fecha
                pago.ganancia = req.body.ganancia
                pago.interes = req.body.interes
                pago.tasa_interes = req.body.tasa_interes
                pago.pago_nro = req.body.pago_nro
                pago.movimiento = req.body.movimientoId
                pago.save()
                    .then((data) => ApiResponse(res, true, 200, data, []))
                    .catch((err) => ApiResponse(res, false, 400, [], err))
            })
            .catch((err) => ApiResponse(res, false, 400, [], err))
    }

    public delete(req: Request, res: Response) {
        const id = parseInt(req.params.id)
        const movimientoId = parseInt(req.params.movimientoId)
        const movCtrl: MovimientosController = new MovimientosController()

        Pagos.findOne({ id })
            .then(async (pago: any) => {
                pago.movimiento = movimientoId
                const response = await movCtrl.updateBalance(pago, 'delete')
                if (!response.ok) console.log('Error al actualizar el saldo')

                pago.remove()
                    .then((data) => ApiResponse(res, true, 200, data, []))
                    .catch((err) => ApiResponse(res, false, 400, [], err))
            })
            .catch((err) => ApiResponse(res, false, 400, [], err))
    }
}
