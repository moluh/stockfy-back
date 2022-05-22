import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { ApiResponse } from '../api/response'
import { Roles } from '../entities/Roles'
import { Usuarios } from '../entities/Usuarios'

const checkRole = (
    decoded: Usuarios,
    requiredRoles: string[],
    next: NextFunction
) => {
    if (
        decoded.roles.some((r: Roles) =>
            requiredRoles.some((rr) => r.role === rr)
        )
    )
        next()
}

export function isAllowed(requiredRoles: string[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        return next()
        const authString = req.headers['authorization']

        if (typeof authString === 'string' && authString.indexOf(' ') > -1) {
            const authArray = authString.split(' ')
            const token = authArray[1]
            jwt.verify(token, process.env.PKEY, async (err, decoded: any) => {
                if (err)
                    return ApiResponse(
                        res,
                        false,
                        403,
                        [],
                        'Token no válido: No tiene autorización para este recurso'
                    )

                checkRole(decoded, requiredRoles, next)
            })
        } else {
            return ApiResponse(res, false, 401, [], 'Token no válido.')
        }
    }
}
