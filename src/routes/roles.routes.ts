import { Request, Response, NextFunction } from 'express'
import { RolesController } from '../controllers/roles.controller'
import * as mw from '../middlewares/auth.middleware'
import { SUPERADMIN } from '../helpers/roles'

export class RolesRouter {
    public controlador: RolesController = new RolesController()

    public routes(app): void {
        app.route('/api/v1/roles')
            .get(mw.isAllowed([SUPERADMIN]), this.controlador.getAll)
            .post(mw.isAllowed([SUPERADMIN]), this.controlador.create)

        // app
        //   .route("/api/v1/roles/paginado")
        //   .get(mw.isAllowed([SUPERADMIN]), this.controlador.getPaginated);

        app.route('/api/v1/role/:id')
            .get(mw.isAllowed([SUPERADMIN]), this.controlador.get)
            .put(mw.isAllowed([SUPERADMIN]), this.controlador.update)
            .delete(mw.isAllowed([SUPERADMIN]), this.controlador.delete)
    }
}
