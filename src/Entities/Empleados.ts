import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity
} from "typeorm";

@Entity("empleados")
export class Empleados extends BaseEntity {
  
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

  @Column({ type: "varchar", length: 6, nullable: true })
  recpass: string;

  @Column({ type: "timestamp", nullable: true })
  created_at: Date;

  @Column({ type: "timestamp", nullable: true })
  updated_at: Date;

  @Column({ type: "varchar", nullable: false })
  role: string;

  @Column({ type: "varchar", nullable: false })
  nro_legajo: string;

  @Column({ type: "varchar", nullable: true })
  puesto: string;

  @Column({ type: "boolean", default: true })
  activo: boolean;

  static findById(id: number) {
    return this.createQueryBuilder("empleado")
      .where("empleado.id = :id", { id })
      .getOne();
  }

  static findByEmail(email: string) {
    return this.createQueryBuilder("empleado")
      .where("empleado.email = :email", { email })
      .getOne();
  }

  static findByTelefono(telefono: string) {
    return this.createQueryBuilder("empleado")
      .where("empleado.telefono = :telefono", { telefono })
      .getOne();
  }

  static findByUsername(username: string) {
    return this.createQueryBuilder("empleado")
      .where("empleado.username = :username", { username })
      .getOne();
  }

  static findByRecpass(recpass: string) {
    return this.createQueryBuilder("empleado")
      .where("empleado.recpass = :recpass", { recpass })
      .getOne();
  }

  static saveCodeRecPass(empleado: Empleados) {
    return this.createQueryBuilder("empleado")
      .update(empleado)
      .set({ recpass: empleado.recpass })
      .where("id = :id", { id: empleado.id })
      .execute();
  }

  static findByRolePaginated(pageNro: number, pageSize: number, role: string) {
    const skipRecords = pageNro * pageSize;
    console.log("Filtrando por rol");
    return this.createQueryBuilder("empleado")
      .where("empleado.role LIKE :rol", { rol: "%" + role + "%" })
      .orderBy("empleado.nombre")
      .offset(skipRecords)
      .limit(pageSize)
      .getMany();
  }

  static findByTxtPaginated(
    pageNro: number,
    pageSize: number,
    attr: string,
    txt: string
  ) {
    const skipRecords = pageNro * pageSize;
    // attr = col nombre, apellido, etc..
    return this.createQueryBuilder("empleado")
      .where(`LOWER(empleado.${attr}) LIKE LOWER(:txt)`, {
        txt: "%" + txt + "%",
      })
      .orderBy("empleado.nombre")
      .offset(skipRecords)
      .limit(pageSize)
      .getMany();
  }
}
