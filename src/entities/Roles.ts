import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
} from "typeorm";
import { Usuarios } from "./Usuarios";

@Entity("roles")
export class Roles extends BaseEntity {
  @PrimaryGeneratedColumn("increment", { type: "integer" })
  id: number;

  //  "SUPERADMIN","ADMIN","USUARIO","EMPLEADO","INVITADO"
  @Column({ type: "varchar", nullable: false })
  role: string;

  @Column({ type: "varchar", nullable: false, default: "" })
  descripcion: string;

  @Column({ type: "int", nullable: false, default: 1 })
  nivel: number;

  @ManyToMany((type) => Usuarios, (usuario) => usuario.roles)
  usuario: Usuarios[];

}
