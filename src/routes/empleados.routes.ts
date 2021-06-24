import { EmpleadosController } from "../controllers/empleados.controller";
import * as mw from "./auth_mw";

export class EmpleadosRouter {
  public controlador: EmpleadosController = new EmpleadosController();

  public routes(app): void {
    app
      .route("/api/v1/empleados")
      .get(mw.jwtAdminMidleware, this.controlador.getAll)
      .post(mw.jwtAdminMidleware, this.controlador.create);

    app
      .route("/api/v1/empleado/:id")
      .get(mw.jwtAdminMidleware, this.controlador.get)
      .put(mw.jwtAdminMidleware, this.controlador.update)
      .delete(mw.jwtAdminMidleware, this.controlador.delete);

    app
      .route("/api/v1/empleados/paginado/role/:id")
      .get(mw.jwtAdminMidleware, this.controlador.findByRolePaginated);

    app
      .route("/api/v1/empleados/paginado")
      .get(mw.jwtAdminMidleware, this.controlador.findByTxtPaginated);
  }
}
