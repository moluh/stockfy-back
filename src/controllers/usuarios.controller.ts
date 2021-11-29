import { Usuarios } from '../Entities/Usuarios';
import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import { ApiResponse } from '../api/response';

export class UsuariosController {

    constructor() {
    }

    public getAll(req: Request, res: Response) {
        Usuarios.find({
            order: { nombre: "ASC" },
            relations: ["roles"]
        })
            .then((usuarios: Usuarios[]) => {
                usuarios.forEach(u => delete u.password);
                return usuarios
            })
            .then(data => ApiResponse(res, true, 200, data, []))
            .catch(err => ApiResponse(res, false, 400, [], err));
    }

    public async create(req: Request, res: Response) {

        const usuario: Usuarios = Usuarios.create({ ...req.body } as Object);
        // todo: find rol "USUARIO" by id and set it automatically
        usuario.roles = req.body.roles || [{ id: 2, role: "USUARIO" }]
        usuario.password = bcrypt.hashSync(req.body.password, 10);

        try {

            if (await Usuarios.findByEmail(usuario.email))
                return ApiResponse(res, false, 400, [], `El email ya se encuentra registrado.`);

            if (await Usuarios.findByUsername(usuario.username))
                return ApiResponse(res, false, 400, [], `El username ya se encuentra registrado.`);

            if (await Usuarios.findByTelefono(usuario.telefono))
                return ApiResponse(res, false, 400, [], `El telefono ya se encuentra registrado.`);

            await usuario.save();
            delete usuario.password;
            ApiResponse(res, true, 200, usuario, null);

        } catch (error) {
            ApiResponse(res, false, 400, [], error);
        }


    };

    public async update(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        const newUser: Usuarios = <Usuarios>{ ...req.body }
        let usuario = await Usuarios.findOne({ id });

        try {

            if (usuario.email !== newUser.email)
                if (await Usuarios.findByEmail(newUser.email))
                    return ApiResponse(res, false, 400, [], `El email ya se encuentra registrado.`);
                else
                    usuario.email = newUser.email;

            if (usuario.username !== newUser.username)
                if (await Usuarios.findByUsername(newUser.username))
                    return ApiResponse(res, false, 400, [], `El username ya se encuentra registrado.`);
                else
                    usuario.username = newUser.username;

            if (usuario.telefono !== newUser.telefono)
                if (await Usuarios.findByTelefono(newUser.telefono))
                    return ApiResponse(res, false, 400, [], `El telefono ya se encuentra registrado.`);
                else
                    usuario.telefono = newUser.telefono;


            usuario = Usuarios.create({ ...req.body } as Object);
            delete usuario.password;

            await usuario.save();
            ApiResponse(res, true, 200, usuario, null);

        } catch (error) {
            ApiResponse(res, false, 400, [], error);
        }

    }


    public async updatePasswordUsuario(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);
        let usuario = await Usuarios.findOne({ id });
        usuario.password = bcrypt.hashSync(req.body.password, 10);

        usuario.save()
            .then((usuario: Usuarios) => {
                delete usuario.password;
                return usuario;
            })
            .then(data => ApiResponse(res, true, 200, data, []))
            .catch(err => ApiResponse(res, false, 400, [], err));

    }

    public async getPaginated(req: Request, res: Response) {

        let pageNro: any = req.query.pageNro;
        let pageSize: any = req.query.pageSize;

        Usuarios.getPaginated(pageNro, pageSize)
            .then(({ data, count }) => {
                data.forEach(u => delete u.password);
                return { data, ...count };
            })
            .then(({ data, count }) => ApiResponse(res, true, 200, data, [], count))
            .catch((err) => ApiResponse(res, false, 400, [], err));
    }

    public async getPaginatedAndFilter(req: Request, res: Response) {

        const pageNro: any = req.query.pageNro;
        const pageSize: any = req.query.pageSize;
        const attribute: any = req.query.attribute || 'nombre';
        const text: any = req.query.text || '';
        const role: any = req.query.role;
        const isActive: any = req.query.isActive;

        Usuarios.getPaginatedAndFilter(pageNro, pageSize, attribute, text, isActive, role)
            .then(({ data, count }) => {
                data.forEach(u => delete u.password);
                return { data, ...count };
            })
            .then(({ data, count }) => ApiResponse(res, true, 200, data, [], count))
            .catch((err) => ApiResponse(res, false, 400, [], err));
    }

    public delete(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Usuarios.findOne({ id })
            .then(usuario => {
                usuario.remove()
                    .then((usuario: Usuarios) => {
                        delete usuario.password;
                        return usuario;
                    })
                    .then(data => ApiResponse(res, true, 200, data, []))
                    .catch(err => ApiResponse(res, false, 400, [], err));
            })
            .catch(err => ApiResponse(res, false, 400, [], err));
    };

    public get(req: Request, res: Response, idUser?: number) {
        const id: number = parseInt(req.params.id);

        Usuarios.findOne({ id }, { relations: ["roles"] })
            .then((usuario: Usuarios) => {
                delete usuario.password;
                return usuario;
            })
            .then(data => ApiResponse(res, true, 200, data, []))
            .catch(err => ApiResponse(res, false, 400, [], err));
    }

    public async getByRecpass(req: Request, res: Response) {
        let recpass = req.params.recpass;
        Usuarios.findByRecpass(recpass)
            .then((usuario: Usuarios) => {
                delete usuario.password;
                return usuario;
            })
            .then(data => ApiResponse(res, true, 200, data, []))
            .catch(err => ApiResponse(res, false, 400, [], err));
    }

}
