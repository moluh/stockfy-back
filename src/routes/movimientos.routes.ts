import { MovimientosController } from '../controllers/movimientos.controller'
import * as mw from '../middlewares/auth.middleware'
import { EMPLEADO, SUPERADMIN } from '../helpers/roles'

export class MovimientosRouter {
    public controlador: MovimientosController = new MovimientosController()

    public routes(app): void {
        app.route('/api/v1/movimientos')
            .get(mw.isAllowed([SUPERADMIN]), this.controlador.getAll)
            .post(mw.isAllowed([EMPLEADO, SUPERADMIN]), this.controlador.create)

        app.route('/api/v1/movimiento/:id')
            .get(mw.isAllowed([EMPLEADO, SUPERADMIN]), this.controlador.get)
            .put(mw.isAllowed([EMPLEADO, SUPERADMIN]), this.controlador.update)
            .delete(
                mw.isAllowed([EMPLEADO, SUPERADMIN]),
                this.controlador.delete
            )

        app.route('/api/v1/movimiento/:id/state/:state').post(
            mw.isAllowed([EMPLEADO, SUPERADMIN]),
            this.controlador.changeState
        )

        app.route('/api/v1/movimientos/paginado/filter').get(
            mw.isAllowed([EMPLEADO, SUPERADMIN]),
            this.controlador.getPaginatedAndFilter
        )

        app.route('/api/v1/movimientos/paginado/clienteId/:clientId').get(
            mw.isAllowed([EMPLEADO, SUPERADMIN]),
            this.controlador.getPaginatedByClientId
        )

        app.route('/api/v1/movimientos/paginado').get(
            mw.isAllowed([EMPLEADO, SUPERADMIN]),
            this.controlador.getPaginated
        )

        app.route('/api/v1/movimientos/paginado/desde/:from/hasta/:to').get(
            mw.isAllowed([EMPLEADO, SUPERADMIN]),
            this.controlador.getPaginatedBetweenDates
        )

        app.route('/api/v1/movimientos/paginado/fecha/:date').get(
            mw.isAllowed([EMPLEADO, SUPERADMIN]),
            this.controlador.getPaginatedByDate
        )
    }
}
