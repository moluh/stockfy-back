import { Imagenes } from '../entities/Imagenes';
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../api/response';


export class ImagenesController {

    constructor() {
    }

    public getAll(req: Request, res: Response) {
        Imagenes.find({
            order: { id: "ASC" }
        })
            .then(data => ApiResponse(res, true, 200, data, []))
            .catch(err => ApiResponse(res, false, 400, [], err));
    }

    public get(req: Request, res: Response) {
        const id: number = parseInt(req.params.id)
        Imagenes.findOne({ id })
            .then(data => ApiResponse(res, true, 200, data, []))
            .catch(err => ApiResponse(res, false, 400, [], err));
    }

    public createImgFromArt(req: Request, res: Response, imagen) {
        let img = Imagenes.create();
        img = imagen;
        img.save()
            .then(img => {
                console.log('ID IMAGEN CTL IMG');
                res.send(img);
                return img.id;
            })
            .catch(err => {
                res.send(err);
                return err;
            });
    };

    public create(req: Request, res: Response) {
        let img = Imagenes.create();
        img = req.body;
        img.save()
            .then(data => ApiResponse(res, true, 200, data, []))
            .catch(err => ApiResponse(res, false, 400, [], err));
    };

    public update(req: Request, res: Response) {
        let id = parseInt(req.params.id);

        Imagenes.findOne({ id })
            .then(img => {
                img.img_thumb = req.body.img_thumb;
                img.url = req.body.url;
                img.producto = req.body.producto;
                img.save()
                    .then(data => ApiResponse(res, true, 200, data, []))
                    .catch(err => ApiResponse(res, false, 400, [], err));
            })
            .catch(err => ApiResponse(res, false, 400, [], err));
    }

    public delete(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);
        
        Imagenes.findOne({ id })
            .then(img => {
                img.remove()
                    .then(data => ApiResponse(res, true, 200, data, []))
                    .catch(err => ApiResponse(res, false, 400, [], err));
            })
            .catch(err => ApiResponse(res, false, 400, [], err));
    };



}