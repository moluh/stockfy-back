import { Talles } from '../entities/Talles';
import { Request, Response } from 'express';
import { ApiResponse } from '../api/response';

export class TallesController {

    constructor() { }

    public getAll(req: Request, res: Response) {
        Talles.find({ order: { talle: "ASC" } })
            .then(data => ApiResponse(res, true, 200, data, []))
            .catch(err => ApiResponse(res, false, 400, [], err));
    }

    public get(req: Request, res: Response) {
        let id = parseInt(req.params.id)
        Talles.findOne({ id })
            .then(data => ApiResponse(res, true, 200, data, []))
            .catch(err => ApiResponse(res, false, 400, [], err));
    }

    public create(req: Request, res: Response) {
        const talles = Talles.create({ ...req.body } as Object);
        delete talles.id;
        talles.save()
            .then(data => ApiResponse(res, true, 200, data, []))
            .catch(err => ApiResponse(res, false, 400, [], err));
    };

    public update(req: Request, res: Response) {
        let id = parseInt(req.params.id)
        Talles.findOne({ id })
            .then((data: Talles) => {
                data.talle = req.body.talle;
                data.save()
                    .then(data => ApiResponse(res, true, 200, data, []))
                    .catch(err => ApiResponse(res, false, 400, [], err));
            })
            .catch(err => { res.send(err) });
    }

    public delete(req: Request, res: Response) {
        let id = parseInt(req.params.id)
        Talles.findOne({ id })
            .then(data => {
                data.remove()
                    .then(data => ApiResponse(res, true, 200, data, []))
                    .catch(err => ApiResponse(res, false, 400, [], err));
            })
            .catch(err => { res.send(err) });
    };


}