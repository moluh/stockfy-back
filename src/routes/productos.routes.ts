import { Request, Response, NextFunction } from "express";
import { ProductosController } from "../controllers/productos.controller";
import * as mw from "./auth_mw";

export class ProductosRouter {
  public controlador: ProductosController = new ProductosController();

  public routes(app): void {
    app
      .route("/api/v1/productos")
      .get(mw.jwtAdminMidleware, this.controlador.getAll)
      .post(mw.jwtAdminMidleware, this.controlador.create);

    app
      .route("/api/v1/producto/:id")
      .get(mw.jwtEmpleadoMidleware, this.controlador.get)
      .put(mw.jwtAdminMidleware, this.controlador.update)
      .delete(mw.jwtAdminMidleware, this.controlador.delete);

    app
      .route("/api/v1/producto/state/:id")
      .post(mw.jwtAdminMidleware, this.controlador.changeState);

    app
      .route("/api/v1/productos/paginado/state")
      .get(mw.jwtEmpleadoMidleware, this.controlador.getPaginatedByState);

    app
      .route("/api/v1/productos/paginado/list")
      .get(mw.jwtEmpleadoMidleware, this.controlador.getPaginatedByIdOfAList);

    app
      .route("/api/v1/productos/paginado/filter")
      .get(mw.jwtEmpleadoMidleware, this.controlador.getPaginatedAndFilter);

    app
      .route("/api/v1/productos/paginado")
      .get(mw.jwtEmpleadoMidleware, this.controlador.getPaginated);

    app
      .route("/api/v1/producto/ean/:ean")
      .get(mw.jwtEmpleadoMidleware, this.controlador.getByEanCode);
  }
}
