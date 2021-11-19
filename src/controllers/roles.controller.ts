import { Roles } from '../Entities/Roles';
import { Request, Response } from 'express';
import { ApiResponse, STATUS_FAILED, STATUS_OK } from '../api/response';

export class RolesController {

    constructor() { }

    public getAll(req: Request, res: Response) {
        Roles.find({ order: { role: "ASC" } })
            .then(data => ApiResponse(res, STATUS_OK, data, []))
            .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
    }

    public get(req: Request, res: Response) {
        let id = parseInt(req.params.id)
        Roles.findOne({ id })
            .then(data => ApiResponse(res, STATUS_OK, data, []))
            .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
    }
    // app
    //   .route("/api/v1/roles/paginado")
    //   .get(mw.jwtAdminMiddleware, this.controlador.getPaginated);

    public create(req: Request, res: Response) {
        const roles = Roles.create({ ...req.body } as Object);
        delete roles.id;
        roles.save()
            .then(data => ApiResponse(res, STATUS_OK, data, []))
            .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
    };

    public update(req: Request, res: Response) {
        let id = parseInt(req.params.id)
        Roles.findOne({ id })
            .then((data: Roles) => {
                data.role = req.body.role;
                data.save()
                    .then(data => ApiResponse(res, STATUS_OK, data, []))
                    .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
            })
            .catch(err => { res.send(err) });
    }

    public delete(req: Request, res: Response) {
        let id = parseInt(req.params.id)
        Roles.findOne({ id })
            .then(data => {
                data.remove()
                    .then(data => ApiResponse(res, STATUS_OK, data, []))
                    .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
            })
            .catch(err => { res.send(err) });
    };


}