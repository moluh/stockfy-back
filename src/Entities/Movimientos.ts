import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { MovimientosLineas } from "./MovimientosLineas";
import { Clientes } from "./Clientes";
import { Pagos } from "./Pagos";
import * as iqa from "./../helpers/isQueryAllowed";

@Entity("movimientos")
export class Movimientos extends BaseEntity {
  @PrimaryGeneratedColumn("increment", { type: "integer" })
  id: number;

  @Column({ type: "timestamp", nullable: false })
  fecha_hora: Date;

  @Column({ type: "varchar", length: 255, nullable: true })
  comentario: string;

  @Column({ type: "char", length: 1, nullable: true })
  estado: string;

  @Column({ type: "double", nullable: false })
  total: number;

  @Column({ type: "varchar", nullable: true })
  modo_pago: string;

  @Column({ type: "double", nullable: true })
  saldo: number;

  @ManyToOne((type) => Clientes, (usuario) => usuario.id)
  cliente: Clientes;

  @OneToMany((type) => Pagos, (pago) => pago.movimiento, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  pagos: Pagos[];

  @ManyToMany(
    (type) => MovimientosLineas,
    (movimiento_lineas) => movimiento_lineas.movimiento,
    { cascade: true }
  )
  @JoinTable()
  movimiento_lineas: MovimientosLineas[];

  static async getPaginated(pageNro: number, pageSize: number) {
    const skipRecords = pageNro * pageSize;
    const count = await this.createQueryBuilder("movimientos")
      .select("COUNT(*)", "count")
      .getRawOne();

    const data = await this.createQueryBuilder("movimientos")
      .innerJoinAndSelect("movimientos.movimiento_lineas", "pl")
      .innerJoinAndSelect("movimientos.cliente", "cliente")
      .leftJoinAndSelect("movimientos.pagos", "pagos")
      .orderBy("movimientos.fecha_hora", "ASC")
      .skip(skipRecords)
      .take(pageSize)
      .getMany();

    return { data, ...count };
  }

  static async getPaginatedAndFilter(
    pageNro: number,
    pageSize: number,
    est: string
  ) {
    try {
      await iqa.isQueryAllowed([est]);
    } catch (error) {
      return error;
    }

    const skipRecords = pageNro * pageSize;
    const count = await this.createQueryBuilder("movimientos")
      .select("COUNT(*)", "count")
      .getRawOne();

    const data = await this.createQueryBuilder("movimientos")
      .where(`movimientos.estado = :est`, { est })
      .innerJoinAndSelect("movimientos.movimiento_lineas", "pl")
      .innerJoinAndSelect("movimientos.pagos", "pagos")
      .orderBy("movimientos.fecha_hora", "ASC")
      .skip(skipRecords)
      .take(pageSize)
      .getMany();

    return { data, ...count };
  }

  static async getPaginatedByEstadoAndUser(
    pageNro: number,
    pageSize: number,
    est: string,
    clienteId: string
  ) {
    try {
      await iqa.isQueryAllowed([est]);
    } catch (error) {
      return error;
    }

    const skipRecords = pageNro * pageSize;
    const count = await this.createQueryBuilder("movimientos")
      .select("COUNT(*)", "count")
      .getRawOne();

    const data = await this.createQueryBuilder("movimientos")
      .innerJoinAndSelect("movimientos.cliente", "mc", `mc.id = :clienteId`, {
        clienteId,
      })
      .innerJoinAndSelect("movimientos.pagos", "pagos")
      .where(`movimientos.estado = :est`, { est })
      .leftJoinAndSelect("movimientos.movimiento_lineas", "pl")
      .orderBy("movimientos.fecha_hora", "ASC")
      .skip(skipRecords)
      .take(pageSize)
      .getMany();

    return { data, ...count };
  }

  static async getPaginatedByUser(
    pageNro: number,
    pageSize: number,
    clienteId: string
  ) {
    const skipRecords = pageNro * pageSize;
    const count = await this.createQueryBuilder("movimientos")
      .select("COUNT(*)", "count")
      .getRawOne();

    const data = await this.createQueryBuilder("movimientos")
      .innerJoinAndSelect("movimientos.clienteId", "pu", `pu.id = :clienteId`, {
        clienteId,
      })
      .leftJoinAndSelect("movimientos.movimiento_lineas", "pl")
      .innerJoinAndSelect("movimientos.pagos", "pagos")
      .orderBy("movimientos.fecha_hora", "ASC")
      .skip(skipRecords)
      .take(pageSize)
      .getMany();

    return { data, ...count };
  }
}
