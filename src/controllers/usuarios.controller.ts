import { Usuarios } from '../Entities/Usuarios';
import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import { ApiResponse, STATUS_FAILED, STATUS_OK } from '../api/response';

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
            .then(data => ApiResponse(res, STATUS_OK, data, []))
            .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
    }

    public async create(req: Request, res: Response) {

        let usuario: Usuarios = new Usuarios();
        let email = req.body.email;
        let username = req.body.username;
        let telefono = req.body.telefono;
        let fc_alta = new Date();

        usuario.roles = req.body.roles || ["USUARIO"]
        usuario.email = email;
        usuario.telefono = telefono;
        usuario.username = username;
        usuario.created_at = fc_alta;
        usuario.updated_at = fc_alta;
        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
        usuario.avatar = req.body.avatar
        usuario.domicilio = req.body.domicilio;
        usuario.password = bcrypt.hashSync(req.body.password, 10);

        await new Promise<void>((resolve, reject) => {
            Usuarios.findOne({ email })
                .then(u => {
                    if (u) {
                        res.json('El email ya se encuentra registrado.');
                    } else {
                        resolve();
                    }
                })
                .catch(err => {
                    res.json(err.message);
                    reject()
                });
        });

        await new Promise<void>((resolve, reject) => {
            Usuarios.findOne({ username })
                .then(u => {
                    if (u) {
                        res.json('El nombre de usuario ya se encuentra registrado.');
                    } else {
                        resolve();
                    }
                })
                .catch(err => {
                    res.json(err.message);
                    reject();
                });
        });

        await new Promise<void>((resolve, reject) => {
            Usuarios.findOne({ telefono })
                .then(u => {
                    if (u) {
                        res.json('El número de teléfono ya se encuentra registrado.');
                    } else {
                        resolve();
                    }
                })
                .catch(err => {
                    res.json(err.message);
                    reject()
                });
        });

        usuario.save()
            .then((usuario: Usuarios) => {
                delete usuario.password;
                res.json(usuario);
            }).catch(err => {
                res.json(err);
            });

    };

    public async update(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        let email = req.body.email;
        let username = req.body.username;
        let telefono = req.body.telefono;
        let fecha = new Date();

        let usuario = await Usuarios.findOne({ id });
        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
        usuario.domicilio = req.body.domicilio;
        usuario.roles = req.body.roles;
        usuario.recpass = null;
        usuario.avatar = req.body.avatar;
        usuario.activo = req.body.activo;
        usuario.updated_at = fecha;

        if (usuario.email !== email) {
            await new Promise<void>((resolve, reject) => {
                Usuarios.findOne({ email })
                    .then(u => {
                        if (u) {
                            res.json('El email ya se encuentra registrado.');
                        } else {
                            usuario.email = email;
                            resolve();
                        }
                    })
                    .catch(err => {
                        res.json(err.message);
                        reject();
                    });
            });
        }

        if (usuario.username !== username) {
            await new Promise<void>((resolve, reject) => {
                Usuarios.findOne({ username })
                    .then(u => {
                        if (u) {
                            res.json('El nombre de usuario ya se encuentra registrado.');
                        } else {
                            usuario.username = username;
                            resolve();
                        }
                    })
                    .catch(err => {
                        res.json(err.message);
                        reject();
                    });
            });
        }

        if (usuario.telefono !== telefono) {
            await new Promise<void>((resolve, reject) => {
                Usuarios.findOne({ telefono })
                    .then(u => {
                        if (u) {
                            res.json('El número de teléfono ya se encuentra registrado.');
                        } else {
                            usuario.telefono = telefono;
                            resolve();
                        }
                    })
                    .catch(err => {
                        res.json(err.message);
                        reject();
                    });
            });
        }

        usuario.save()
            .then((usuario: Usuarios) => {
                delete usuario.password;
                res.json(usuario);
            })
            .catch(err => {
                res.json(err)
            })

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
            .then(data => ApiResponse(res, STATUS_OK, data, []))
            .catch(err => ApiResponse(res, STATUS_FAILED, [], err));

    }

    public async getPaginated(req: Request, res: Response) {

        let pageNro: any = req.query.pageNro;
        let pageSize: any = req.query.pageSize;

        Usuarios.getPaginated(pageNro, pageSize)
            .then(({ data, count }) => {
                data.forEach(u => delete u.password);
                return { data, ...count };
            })
            .then(({ data, count }) => ApiResponse(res, STATUS_OK, data, [], count))
            .catch((err) => ApiResponse(res, STATUS_FAILED, [], err));
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
            .then(({ data, count }) => ApiResponse(res, STATUS_OK, data, [], count))
            .catch((err) => ApiResponse(res, STATUS_FAILED, [], err));
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
                    .then(data => ApiResponse(res, STATUS_OK, data, []))
                    .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
            })
            .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
    };

    public get(req: Request, res: Response, idUser?: number) {
        const id: number = parseInt(req.params.id);

        Usuarios.findOne({ id }, { relations: ["roles"] })
            .then((usuario: Usuarios) => {
                delete usuario.password;
                return usuario;
            })
            .then(data => ApiResponse(res, STATUS_OK, data, []))
            .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
    }

    public async getByRecpass(req: Request, res: Response) {
        let recpass = req.params.recpass;
        let usuario = await Usuarios.findByRecpass(recpass)
            .then((usuario: Usuarios) => {
                delete usuario.password;
                return usuario;
            })
            .then(data => ApiResponse(res, STATUS_OK, data, []))
            .catch(err => ApiResponse(res, STATUS_FAILED, [], err));
    }

}
