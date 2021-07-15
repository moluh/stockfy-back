import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity
} from "typeorm";
import * as iqa from "./../helpers/isQueryAllowed";

@Entity("usuarios")
export class Usuarios extends BaseEntity {
  @PrimaryGeneratedColumn("increment", { type: "integer" })
  id: number;

  @Column({ type: "varchar", length: 150, nullable: false })
  username: string;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @Column({ type: "varchar", length: 150, nullable: true })
  nombre: string;

  @Column({ type: "varchar", length: 150, nullable: true })
  apellido: string;

  @Column({ type: "varchar", length: 150, nullable: true })
  provincia: string;

  @Column({ type: "varchar", length: 150, nullable: true })
  localidad: string;

  @Column({ type: "varchar", nullable: true })
  avatar: string;

  @Column({ type: "varchar", length: 30, nullable: true })
  telefono: string;

  @Column({ type: "varchar", length: 40, nullable: true })
  domicilio: string;

  @Column({ type: "varchar", length: 70, nullable: true })
  email: string;

  @Column({ type: "varchar", length: 6, nullable: true })
  recpass: string;

  @Column({ type: "timestamp", nullable: true })
  created_at: Date;

  @Column({ type: "timestamp", nullable: true })
  updated_at: Date;

  @Column({ type: "varchar", length: 20, nullable: false })
  role: string;

  @Column({ type: "boolean", default: true })
  activo: boolean;

  static findById(id: number) {
    return this.createQueryBuilder("usuario")
      .where("usuario.id = :id", { id })
      .getOne();
  }

  static findByEmail(email: string) {
    return this.createQueryBuilder("usuario")
      .where("usuario.email = :email", { email })
      .getOne();
  }

  static findByTelefono(telefono: string) {
    return this.createQueryBuilder("usuario")
      .where("usuario.telefono = :telefono", { telefono })
      .getOne();
  }

  static findByUsername(username: string) {
    return this.createQueryBuilder("usuario")
      .where("usuario.username = :username", { username })
      .getOne();
  }

  static findByRecpass(recpass: string) {
    return this.createQueryBuilder("usuario")
      .where("usuario.recpass = :recpass", { recpass })
      .getOne();
  }

  static saveCodeRecPass(usuario: Usuarios) {
    return this.createQueryBuilder("usuario")
      .update(usuario)
      .set({ recpass: usuario.recpass })
      .where("id = :id", { id: usuario.id })
      .execute();
  }

  static async getPaginated(pageNro: number, pageSize: number) {
    const skipRecords = pageNro * pageSize;
    const count = await this.createQueryBuilder("usuario")
      .select("COUNT(*)", "count")
      .getRawOne();

    const data = await this.createQueryBuilder("usuario")
      .orderBy("usuario.id", "DESC")
      .skip(skipRecords)
      .take(pageSize)
      .getMany();

    return { data, ...count };
  }

  static async getPaginatedAndFilter(
    pageNro: number,
    pageSize: number,
    attribute: string,
    text: string,
    isActive: string,
    role: string
  ) {
    
    try {
      await iqa.isQueryAllowed([attribute]);
    } catch (error) {
      return error;
    }

    const active = isActive === "true" ? 1 : 0;
    const filterBy = attribute === "activo" ? "boolean" : "string";
    const skipRecords = pageNro * pageSize;

    if (attribute === undefined || attribute === "") attribute = "nombre";
    if (text === undefined || text === "") text = "";

    switch (filterBy) {
      case "boolean": {
        const count = await this.createQueryBuilder("usuario")
          .select("COUNT(*)", "count")
          .getRawOne();

        const data = await this.createQueryBuilder("usuario")
          .where(`LOWER(usuario.activo) LIKE :active`, {
            active: "%" + active + "%",
          })
          .andWhere(`LOWER(usuario.role) LIKE :role`, {
            role: "%" + role + "%",
          })
          .orderBy("usuario.id", "DESC")
          .skip(skipRecords)
          .take(pageSize)
          .getMany();

        return { data, ...count };
      }
      case "string": {
        const count = await this.createQueryBuilder("usuario")
          .select("COUNT(*)", "count")
          .getRawOne();

        const data = await this.createQueryBuilder("usuario")
          .where(`LOWER(usuario.${attribute}) LIKE LOWER(:text)`, {
            text: "%" + text + "%",
          })
          .andWhere(`LOWER(usuario.role) LIKE :role`, {
            role: "%" + role + "%",
          })
          .orderBy("usuario.id", "DESC")
          .skip(skipRecords)
          .take(pageSize)
          .getMany();

        return { data, ...count };
      }
      default:
        break;
    }
  }
}
