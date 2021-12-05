import { Modulos } from "../entities/Modulos";
import { Roles } from "../entities/Roles";
import { Usuarios } from "../entities/Usuarios";
import { modules } from "./constants/modules";
import { roles } from "./constants/roles";
import { sizes } from "./constants/sizes";
import { users } from "./constants/users";

export class MockData {
  constructor() {}

  public async mock() {
    try {

      for (let i = 0; i < modules.length; i++) {
        const res = await Modulos.create({...modules[i]} as Object).save();
        console.log("modu", res);
      }
      console.log("======================================");
      for (let i = 0; i < roles.length; i++) {
        const res = await Roles.create({...roles[i]} as Object).save();
        console.log("rol", res); 
      }
      console.log("======================================");  
      for (let i = 0; i < users.length; i++) {
        const res = await Usuarios.create({...users[i]} as Object).save();
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
      console.log('error', error);

    }
      
    // const users = Usuarios.create({ ...req.body } as Object);
    // await users.save();
  }
}
