import { EmpleadosController } from "../controllers/empleados.controller";
import * as mw from "../auth/auth.middleware";

export class EmpleadosRouter {
  public controlador: EmpleadosController = new EmpleadosController();

  public routes(app): void {
    app
      .route("/api/v1/empleados")
      .get(mw.jwtAdminMiddleware, this.controlador.getAll)
      .post(mw.jwtAdminMiddleware, this.controlador.create);

    app
      .route("/api/v1/empleado/:id")
      .get(mw.jwtAdminMiddleware, this.controlador.get)
      .put(mw.jwtAdminMiddleware, this.controlador.update)
      .delete(mw.jwtAdminMiddleware, this.controlador.delete);

    app
      .route("/api/v1/empleados/paginado/role/:id")
      .get(mw.jwtAdminMiddleware, this.controlador.findByRolePaginated);

    app
      .route("/api/v1/empleados/paginado")
      .get(mw.jwtAdminMiddleware, this.controlador.findByTxtPaginated);
  }
}
