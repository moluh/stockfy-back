import { Request, Response, NextFunction } from 'express'
import { MarcasController } from '../controllers/marcas.controller'
import * as mw from '../middlewares/auth.middleware'
import { SUPERADMIN } from '../helpers/roles'

export class MarcasRouter {
    public controlador: MarcasController = new MarcasController()

    public routes(app): void {
        app.route('/api/v1/marcas')
            .get(mw.isAllowed([SUPERADMIN]), this.controlador.getAll)
            .post(mw.isAllowed([SUPERADMIN]), this.controlador.create)

        app.route('/api/v1/marcas/paginado').get(
            mw.isAllowed([SUPERADMIN]),
            this.controlador.getPaginated
        )

        app.route('/api/v1/marca/:id')
            .get(mw.isAllowed([SUPERADMIN]), this.controlador.get)
            .put(mw.isAllowed([SUPERADMIN]), this.controlador.update)
            .delete(mw.isAllowed([SUPERADMIN]), this.controlador.delete)
    }
}
