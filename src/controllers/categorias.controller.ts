import { Categorias } from '../Entities/Categorias';
import { Request, Response } from 'express';
import { ApiResponse, STATUS_FAILED, STATUS_OK } from '../api/response';

interface MulterRequest extends Request {
    file: any;
}

export class CategoriasController {

    constructor() { }

    public getAll(req: Request, res: Response) {
        Categorias.find({ order: { categoria: "ASC" } })
            .then(data => ApiResponse(res, STATUS_OK, data, []))
            .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
    }

    public getPaginated(req: Request, res: Response) {
        const pageNro: any = req.query.pageNro || 0;
        const pageSize: any = req.query.pageSize || 10;

        Categorias.getPaginated(pageNro, pageSize)
            .then(data => ApiResponse(res, STATUS_OK, data, []))
            .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
    }

    public getActives(req: Request, res: Response) {
        Categorias.find({
            where: { activo: true },
            order: { categoria: "ASC" }
        })
            .then(data => ApiResponse(res, STATUS_OK, data, []))
            .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
    }

    public get(req: Request, res: Response) {
        let id = parseInt(req.params.id)
        Categorias.findOne({ id })
            .then(data => ApiResponse(res, STATUS_OK, data, []))
            .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
    }

    public create(req: MulterRequest, res: Response) {
        const categorias = Categorias.create({ ...req.body } as Object);
        delete categorias.id;
        categorias.save()
            .then(data => ApiResponse(res, STATUS_OK, data, []))
            .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
    };

    public update(req: Request, res: Response) {
        let id = parseInt(req.params.id)
        Categorias.findOne({ id })
            .then((data: Categorias) => {
                data.categoria = req.body.categoria;
                data.activo = req.body.activo;
                data.save()
                    .then(data => ApiResponse(res, STATUS_OK, data, []))
                    .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
            })
            .catch(err => { res.send(err) });
    }

    public delete(req: Request, res: Response) {
        let id = parseInt(req.params.id)
        Categorias.findOne({ id })
            .then(data => {
                data.remove()
                    .then(data => ApiResponse(res, STATUS_OK, data, []))
                    .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
            })
            .catch(err => { res.send(err) });
    };


}