import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import * as iqa from "./../helpers/isQueryAllowed";

@Entity("clientes")
export class Clientes extends BaseEntity {
  @PrimaryGeneratedColumn("increment", { type: "integer" })
  id: number;

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

  @Column({ type: "varchar", length: 150, nullable: true })
  domicilio: string;

  @Column({ type: "varchar", length: 70, nullable: true })
  email: string;

  @Column({ type: "timestamp", nullable: true })
  created_at: Date;

  @Column({ type: "timestamp", nullable: true })
  updated_at: Date;

  @Column({ type: "boolean", default: true })
  activo: boolean;

  static findById(id: number) {
    return this.createQueryBuilder("cliente")
      .where("cliente.id = :id", { id })
      .getOne();
  }

  static findByEmail(email: string) {
    return this.createQueryBuilder("cliente")
      .where("cliente.email = :email", { email })
      .getOne();
  }

  static findByTelefono(telefono: string) {
    return this.createQueryBuilder("cliente")
      .where("cliente.telefono = :telefono", { telefono })
      .getOne();
  }

  static async getPaginated(pageNro: number, pageSize: number) {
    const skipRecords = pageNro * pageSize;
    const count = await this.createQueryBuilder("cliente")
      .select("COUNT(*)", "count")
      .getRawOne();

    const data = await this.createQueryBuilder("cliente")
      .orderBy("cliente.id", "DESC")
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
    isActive: string
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
        const count = await this.createQueryBuilder("cliente")
          .select("COUNT(*)", "count")
          .getRawOne();

        const data = await this.createQueryBuilder("cliente")
          .where(`LOWER(cliente.activo) LIKE :active`, {
            active: "%" + active + "%",
          })
          .orderBy("cliente.id", "DESC")
          .skip(skipRecords)
          .take(pageSize)
          .getMany();

        return { data, ...count };
      }
      case "string": {
        const count = await this.createQueryBuilder("cliente")
          .select("COUNT(*)", "count")
          .getRawOne();

        const data = await this.createQueryBuilder("cliente")
          .where(`LOWER(cliente.${attribute}) LIKE LOWER(:text)`, {
            text: "%" + text + "%",
          })
          .orderBy("cliente.id", "DESC")
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
