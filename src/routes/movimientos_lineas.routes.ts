import { Request, Response, NextFunction } from "express";
import { MovimientosLineasController } from "../controllers/movimientos_lineas.controller";
import * as mw from './auth_mw';

export class MovimientosLineaRouter {

    public controlador: MovimientosLineasController = new MovimientosLineasController();

    public routes(app): void {
        app.route('/api/v1/movimientoslineas')
            .get((req: Request, res: Response, next: NextFunction) => {
                next();
            }, mw.jwtAdminMidleware, this.controlador.getAll)
            .post(this.controlador.create);

        app.route('/api/v1/movimientolinea/:id')
            .get(mw.jwtAdminMidleware, this.controlador.get)
            .put(mw.jwtAdminMidleware, this.controlador.update)
            .delete(mw.jwtAdminMidleware, this.controlador.delete);

    }

}
