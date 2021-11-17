import { Request, Response, NextFunction } from "express";
import { CategoriasController } from "../controllers/categorias.controller";
import * as mw from "../auth/auth.middleware";
import multer from "multer";

interface MulterRequest extends Request {
  file: any;
}

// Post imagenes
let storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, "/var/www/controlstock.com.ar/imagenes/categorias");
  },
  filename: (req: Request, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
export class CategoriasRouter {
  public controlador: CategoriasController = new CategoriasController();

  public routes(app): void {
    app
      .route("/api/v1/categorias")
      .get(mw.jwtAdminMiddleware, this.controlador.getAll)
      .post(mw.jwtAdminMiddleware, this.controlador.create);

    app
      .route("/api/v1/categorias/activas")
      .get(mw.jwtAdminMiddleware, this.controlador.getActives);

    app
      .route("/api/v1/categorias/paginado")
      .get(mw.jwtAdminMiddleware, this.controlador.getPaginated);

    app
      .route("/api/v1/categoria/:id")
      .get(mw.jwtAdminMiddleware, this.controlador.get)
      .put(mw.jwtAdminMiddleware, this.controlador.update)
      .delete(mw.jwtAdminMiddleware, this.controlador.delete);

    app
      .route("/api/v1/files/categoria")
      .post(
        mw.jwtAdminMiddleware,
        upload.single("file"),
        this.controlador.create
      );
  }
}
