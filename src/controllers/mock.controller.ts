import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { Modulos } from "../entities/Modulos";
import { Roles } from "../entities/Roles";
import { Usuarios } from "../entities/Usuarios";
import { modules } from "../mock/constants/modules";
import { roles } from "../mock/constants/roles";
import { users } from "../mock/constants/users";

// -> onConflict = only for postgresql
// .onConflict(`("id") DO NOTHING`)
// .onConflict(`("id") DO UPDATE SET "title" = :title`)
// .setParameter("title", post2.title)

export class MockController {
  constructor() {}

  public async mock(req: Request, res: Response) {
    try {
      // console.log("options", req.query.options);
      // TODO: add conditionals 
      for (let i = 0; i < modules.length; i++) {
        const res = await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Modulos)
          .values(modules[i])
          .orUpdate({
            conflict_target: ["id"],
            overwrite: ["modulo", "activo"],
          })
          .execute();

        // const res = await Modulos.create({ ...modules[i] } as Object).save();
        console.log("modu", res);
      }
      console.log("======================================");
      return; // res.json({ok: "ok"})
      for (let i = 0; i < roles.length; i++) {
        const res = await Roles.create({ ...roles[i] } as Object).save();
        console.log("rol", res);
      }
      console.log("======================================");
      for (let i = 0; i < users.length; i++) {
        const res = await Usuarios.create({ ...users[i] } as Object).save();
        console.log("user", res);
      }
      console.log("======================================");

      /**
       * 
      modules.forEach(async (mod) => {
        const res = Modulos.create(mod as Object);
        const modu = await res.save();
        console.log("modu", modu);
      });
      setTimeout(() => {
        roles.forEach(async (role) => {
          const res = Roles.create(role as Object); //.save();
          const rol = await res.save();
          console.log("rol", rol);
        });
        setTimeout(() => {
          users.forEach(async (user) => {
            const res = Usuarios.create(user as Object); //.save();
            const usuario = await res.save();
            console.log("usuario", usuario);
          });
        }, 5000);
      }, 5000);
       */
      // sizes.forEach(async (siz) => {
      //   const res = Modulos.create(mod as Object)//.save();
      //   const modu = await res.save();
      //   console.log("modu", modu);
      // });
    } catch (error) {
      console.log("error", error);
    }

    // const users = Usuarios.create({ ...req.body } as Object);
    // await users.save();
  }
}
