import { Request, Response, NextFunction } from 'express'
import * as mw from '../middlewares/auth.middleware'
import multer from 'multer'
import { ProductosController } from '../controllers/productos.controller'
import { SUPERADMIN } from '../helpers/roles'

interface MulterRequest extends Request {
    file: any
}

// Post imagenes
let storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        cb(null, `${process.env.FILES_DIR}/images`)
    },
    filename: (req: Request, file, cb) => {
        console.log('FILE', file)
        cb(null, `${Date.now()}-prod-${file.originalname}`)
    },
})

const upload = multer({ storage })

export class FilesUploadProductosRouter {
    public ctlProductos: ProductosController = new ProductosController()

    public routes(app): void {
        app.route('/api/v1/files').post(
            mw.isAllowed([SUPERADMIN]),
            upload.single('file'),
            this.ctlProductos.createImgAndAssignToArt
        )
    }
}
