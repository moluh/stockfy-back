import nodemailer from "nodemailer";
import { Request, Response } from "express";

export class TransactionalMailsController {
  constructor() {}

  public async createTransport(req: Request, res: Response) {
    let body = req.body;

    if (body.correo == "" || body.correo == null || body.correo == undefined) {
      res.json({
        ok: false,
        msg: "No ingresó ningún correo",
      });
      return null;
    }

    let transporter = nodemailer.createTransport({
      host: "vps-123123123-x.dattaweb.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "no-reply@stockfy.com.ar", // generated ethereal user
        pass: "1eCdsAWI6H", // generated ethereal password
      },
    });

    switch (body.role) {
      //Correo para el registro de usuarios
      case "RU":
        transporter
          .sendMail({
            from: '"Control Stock" <no-reply@stockfy.com.ar>',
            to: `${body.correo}`,
            subject: "Confirmación de registro",

            html: `
                    <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Email registro</title>
                </head>
                <body>
                    <div class="contenedor" style="" align="center">
                    <img style="max-height: 110px; width: auto;" src="https://stockfy.com.ar/imagenes/logo.jpeg" alt="" srcset="">
                        <h4 class="txt-title" style="color: #e7600f;">¡Bienvenido a Control Stock!</h4>
                        <br>
                        <p>Tu registro se ha realizado con exito.</p>
                        <br>
                    </div>
                </body>
                </html>
                    `,
          })
          .then((resp) => {
            res.json({
              ok: true,
              msg: "¡Mensaje enviado con exito!",
            });
          });
        break;

      default:
        break;
    }
  }
}
