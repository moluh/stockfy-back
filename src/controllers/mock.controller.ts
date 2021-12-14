import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { Categorias } from "../entities/Categorias";
import { Marcas } from "../entities/Marcas";
import { Modulos } from "../entities/Modulos";
import { Roles } from "../entities/Roles";
import { Talles } from "../entities/Talles";
import { Usuarios } from "../entities/Usuarios";
import { brands } from "../mock/constants/brands";
import { categories } from "../mock/constants/categories";
import { modules } from "../mock/constants/modules";
import { roles } from "../mock/constants/roles";
import { sizes } from "../mock/constants/sizes";
import { users } from "../mock/constants/users";

// -> onConflict = only for postgresql
// .onConflict(`("id") DO NOTHING`)
// .onConflict(`("id") DO UPDATE SET "title" = :title`)
// .setParameter("title", post2.title)

export class MockController {
  constructor() { }

  public async mock(req: Request, res: Response) {
    try {

      console.log("EJECUTANDO MOCK \n ================ ");
      // TODO: add conditionals 
      for (let i = 0; i < modules.length; i++) {
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Modulos)
          .values(modules[i])
          .orUpdate({
            conflict_target: ["id"],
            overwrite: ["modulo", "activo"],
          })
          .execute();
      }
      
      for (let i = 0; i < roles.length; i++) {
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Roles)
          .values(roles[i])
          .orUpdate({
            conflict_target: ["id"],
            overwrite: ["role", "descripcion", "nivel"],
          })
          .execute();
      }
      
      for (let i = 0; i < users.length; i++) {
        await Usuarios.create(users[i] as Object).save();
      }

      for (let i = 0; i < sizes.length; i++) {
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Talles)
          .values(sizes[i])
          .orUpdate({
            conflict_target: ["id"],
            overwrite: ["talle"],
          })
          .execute();
      }

      for (let i = 0; i < categories.length; i++) {
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Categorias)
          .values(categories[i])
          .orUpdate({
            conflict_target: ["id"],
            overwrite: ["categoria"],
          })
          .execute();
      }

      for (let i = 0; i < brands.length; i++) {
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Marcas)
          .values(brands[i])
          .orUpdate({
            conflict_target: ["id"],
            overwrite: ["marca"],
          })
          .execute();
      }
    } catch (error) {
      console.log("error", error);
    }
  }
}
