import { Request, Response, NextFunction } from "express";
import * as mw from "./auth_mw";
import multer from "multer";
import { ProductosController } from "../controllers/productos.controller";

interface MulterRequest extends Request {
  file: any;
}

// Post imagenes
let storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, "/var/www/controlstock/archivos");
  },
  filename: (req: Request, file, cb) => {
    console.log("FILE", file);
    cb(null, `${Date.now()}-prod-${file.originalname}`);
  },
});

const upload = multer({ storage });

export class FilesUploadProductosRouter {
  public ctlProductos: ProductosController = new ProductosController();

  public routes(app): void {
    app
      .route("/api/v1/files")
      .post(
        mw.jwtAdminMiddleware,
        upload.single("file"),
        this.ctlProductos.createImgAndAssignToArt
      );
  }
}
