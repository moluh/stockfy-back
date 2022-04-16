import { Request, Response, NextFunction } from "express";
import { CategoriasController } from "../controllers/categorias.controller";
import * as mw from "../middlewares/auth.middleware";
import multer from "multer";
import { ADMIN, SUPERADMIN } from "../helpers/roles";

interface MulterRequest extends Request {
  file: any;
}

// Post imagenes
let storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null,  `${process.env.FILES_DIR}/images/categories`);
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
      .get(mw.isAllowed([ADMIN]), this.controlador.getAll)
      .post(mw.isAllowed([SUPERADMIN]), this.controlador.create);

    app
      .route("/api/v1/categorias/activas")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.getActives);

    app
      .route("/api/v1/categorias/paginado")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.getPaginated);

    app
      .route("/api/v1/categoria/:id")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.get)
      .put(mw.isAllowed([SUPERADMIN]), this.controlador.update)
      .delete(mw.isAllowed([SUPERADMIN]), this.controlador.delete);

    app
      .route("/api/v1/files/categoria")
      .post(
        mw.isAllowed([SUPERADMIN]),
        upload.single("file"),
        this.controlador.create
      );
  }
}
