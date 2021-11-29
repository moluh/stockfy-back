import { Roles } from '../Entities/Roles';
import { Request, Response } from 'express';
import { ApiResponse } from '../api/response';

export class RolesController {

    constructor() { }

    public getAll(req: Request, res: Response) {
        Roles.find({ order: { role: "ASC" }, relations: ["modulo", "modulo.permiso"] })
            .then(data => ApiResponse(res, true, 200, data, []))
            .catch(err => ApiResponse(res, false, 400, [], err));
    }

    public get(req: Request, res: Response) {
        let id = parseInt(req.params.id)
        Roles.findOne({ id })
            .then(data => ApiResponse(res, true, 200, data, []))
            .catch(err => ApiResponse(res, false, 400, [], err));
    }

    public create(req: Request, res: Response) {
        const roles = Roles.create({ ...req.body } as Object);
        delete roles.id;
        roles.save()
            .then(data => ApiResponse(res, true, 200, data, []))
            .catch(err => ApiResponse(res, false, 400, [], err));
    };

    public update(req: Request, res: Response) {
        let id = parseInt(req.params.id)
        Roles.findOne({ id })
            .then((data: Roles) => {
                data.role = req.body.role;
                data.descripcion = req.body.descripcion;
                data.nivel = req.body.nivel;
                data.modulo = req.body.modulo;
                data.save()
                    .then(data => ApiResponse(res, true, 200, data, []))
                    .catch(err => ApiResponse(res, false, 400, [], err));
            })
            .catch(err => { res.send(err) });
    }

    public delete(req: Request, res: Response) {
        let id = parseInt(req.params.id)
        Roles.findOne({ id })
            .then(data => {
                data.remove()
                    .then(data => ApiResponse(res, true, 200, data, []))
                    .catch(err => ApiResponse(res, false, 400, [], err));
            })
            .catch(err => { res.send(err) });
    };


}