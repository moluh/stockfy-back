import { Request, Response, NextFunction } from "express";
import { MovimientosLineasController } from "../controllers/movimientos_lineas.controller";
import * as mw from '../middlewares/auth.middleware';
import { SUPERADMIN } from "../helpers/roles";

export class MovimientosLineaRouter {

    public controlador: MovimientosLineasController = new MovimientosLineasController();

    public routes(app): void {
        app.route('/api/v1/movimientoslineas')
            .get((req: Request, res: Response, next: NextFunction) => {
                next();
            }, mw.isAllowed([SUPERADMIN]), this.controlador.getAll)
            .post(this.controlador.create);

        app.route('/api/v1/movimientolinea/:id')
            .get(mw.isAllowed([SUPERADMIN]), this.controlador.get)
            .put(mw.isAllowed([SUPERADMIN]), this.controlador.update)
            .delete(mw.isAllowed([SUPERADMIN]), this.controlador.delete);

    }

}
