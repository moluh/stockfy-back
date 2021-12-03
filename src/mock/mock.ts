import { Modulos } from "../entities/Modulos";
import { modules } from "./constants/modules";

export class MockData {
  constructor() {}

  public async mock() {
    try {
      modules.forEach(async (mod) => {
        console.log("mod", mod);
        await Modulos.create(mod as Object).save();
      });
    } catch (error) {}

    // const users = Usuarios.create({ ...req.body } as Object);
    // await users.save();
  }
}
