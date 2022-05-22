import { Usuarios } from '../entities/Usuarios'
import { Request, Response } from 'express'
import { Config } from '../config/config'
const config: Config = new Config()
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { ApiResponse } from '../api/response'
import { USUARIO } from '../helpers/roles'

export class UsuariosAuthController {
    constructor() {}

    public async loginUsuario(req: Request, res: Response) {
        let email = req.body.email
        let password = req.body.password
        let username = req.body.username
        let telefono = req.body.telefono
        let usuario: Usuarios

        if (email) usuario = await Usuarios.findByEmail(email)
        if (telefono) usuario = await Usuarios.findByTelefono(telefono)
        if (username) usuario = await Usuarios.findByUsername(username)

        if (!usuario)
            return ApiResponse(res, false, 404, [], {
                isLogged: false,
                token: null,
                error: 'Datos incorrectos.',
            })

        if (usuario.roles.some((r) => r.role === USUARIO))
            return ApiResponse(res, false, 401, [], {
                isLogged: false,
                token: null,
                error: 'Permiso denegado.',
            })

        const validatePassword = bcrypt.compareSync(password, usuario.password)

        if (!validatePassword) {
            return ApiResponse(res, false, 401, [], {
                isLogged: false,
                token: null,
                error: 'Datos incorrectos.',
            })
        }

        const userForToken: Usuarios = <Usuarios>{
            id: usuario.id,
            username: usuario.username,
            email: usuario.email,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            telefono: usuario.telefono,
            activo: usuario.activo,
            roles: usuario.roles,
            modulos: usuario.modulos,
        }

        const token: string = jwt.sign(userForToken, config.pkey, {
            expiresIn: config.jwtExp,
        })

        ApiResponse(
            res,
            true,
            200,
            {
                isLogged: true,
                token,
                expiresIn: config.jwtExp,
            },
            null
        )
        // res.status(200).send({
        //   isLogged: true,
        //   token,
        //   expiresIn: config.jwtExp,
        // });
    }
}
