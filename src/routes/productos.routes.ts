import { Request, Response, NextFunction } from "express";
import { ProductosController } from "../controllers/productos.controller";
import * as mw from "./auth_mw";

export class ProductosRouter {
  public controlador: ProductosController = new ProductosController();

  public routes(app): void {
    app
      .route("/api/v1/productos")
      .get(mw.jwtAdminMiddleware, this.controlador.getAll)
      .post(mw.jwtAdminMiddleware, this.controlador.create);

    app
      .route("/api/v1/producto/:id")
      .get(mw.jwtEmpleadoMiddleware, this.controlador.get)
      .put(mw.jwtAdminMiddleware, this.controlador.update)
      .delete(mw.jwtAdminMiddleware, this.controlador.delete);

    app
      .route("/api/v1/producto/state/:id")
      .post(mw.jwtAdminMiddleware, this.controlador.changeState);

    app
      .route("/api/v1/productos/paginado/state")
      .get(mw.jwtEmpleadoMiddleware, this.controlador.getPaginatedByState);

    app
      .route("/api/v1/productos/paginado/list")
      .get(mw.jwtEmpleadoMiddleware, this.controlador.getPaginatedByIdOfAList);

    app
      .route("/api/v1/productos/paginado/filter")
      .get(mw.jwtEmpleadoMiddleware, this.controlador.getPaginatedAndFilter);

    app
      .route("/api/v1/productos/paginado")
      .get(mw.jwtEmpleadoMiddleware, this.controlador.getPaginated);

    app
      .route("/api/v1/producto/ean/:ean")
      .get(mw.jwtEmpleadoMiddleware, this.controlador.getByEanCode);
  }
}
