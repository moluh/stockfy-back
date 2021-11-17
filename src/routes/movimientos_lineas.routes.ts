import { Request, Response, NextFunction } from "express";
import { MovimientosLineasController } from "../controllers/movimientos_lineas.controller";
import * as mw from '../auth/auth.middleware';

export class MovimientosLineaRouter {

    public controlador: MovimientosLineasController = new MovimientosLineasController();

    public routes(app): void {
        app.route('/api/v1/movimientoslineas')
            .get((req: Request, res: Response, next: NextFunction) => {
                next();
            }, mw.jwtAdminMiddleware, this.controlador.getAll)
            .post(this.controlador.create);

        app.route('/api/v1/movimientolinea/:id')
            .get(mw.jwtAdminMiddleware, this.controlador.get)
            .put(mw.jwtAdminMiddleware, this.controlador.update)
            .delete(mw.jwtAdminMiddleware, this.controlador.delete);

    }

}
