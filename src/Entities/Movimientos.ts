import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  getConnection,
} from "typeorm";
import { MovimientosLineas } from "./MovimientosLineas";
import { Clientes } from "./Clientes";
import { Pagos } from "./Pagos";
import * as iqa from "./../helpers/isQueryAllowed";

@Entity("movimientos")
export class Movimientos extends BaseEntity {
  @PrimaryGeneratedColumn("increment", { type: "integer" })
  id: number;

  @Column({ type: "date", nullable: true, default: "" })
  fecha: Date;

  @Column({ type: "time", nullable: true, default: "" })
  hora: Date;

  @Column({ type: "varchar", length: 255, nullable: true })
  comentario: string;

  /**
  p = pendiente
  c = completado
  a = anulado     */
  @Column({ type: "char", length: 1, nullable: true })
  estado: string;

  @Column({ type: "double", nullable: false })
  total: number;

  /**
  efectivo
  ctacte
  tarjeta       */
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
      .orderBy("movimientos.fecha", "ASC")
      .skip(skipRecords)
      .take(pageSize)
      .getMany();

    return { data, ...count };
  }

  static async getBetweenDates(from, to) {
    console.log({ from, to });
    const query = `
      SELECT 
      SUM(mov.total) as "TotalVendido",
      SUM(p.monto) as "TotalDePagos",
      SUM(p.ganancia) as "Ganancias",
      COUNT(p.id) as "CountPagos",
      COUNT(mov.id) as "CountMovimientos"
      FROM movimientos mov
      LEFT JOIN movimientos_movimiento_lineas_movimientoslineas mov_ml ON mov_ml.movimientosId=mov.id
      LEFT JOIN movimientoslineas ml ON ml.id=mov_ml.movimientoslineasId
      LEFT JOIN pagos p ON p.movimientoId=mov.id 
      WHERE mov.fecha BETWEEN ? AND ?
    `;
    const data = await getConnection().query(query, [from, to]);

    return [...data];
  }

  static async getBetweenDatesGraphic(from, to) {
    console.log({ from, to });
    const query = `
      SELECT 
      mov.fecha as "Fecha",
      SUM(mov.total) as "TotalVendido",
      SUM(p.monto) as "TotalDePagos",
      SUM(p.ganancia) as "Ganancias",
      COUNT(p.id) as "CountPagos",
      COUNT(mov.id) as "CountMovimientos"
      FROM movimientos mov
      LEFT JOIN movimientos_movimiento_lineas_movimientoslineas mov_ml ON mov_ml.movimientosId=mov.id
      LEFT JOIN movimientoslineas ml ON ml.id=mov_ml.movimientoslineasId
      LEFT JOIN pagos p ON p.movimientoId=mov.id 
      WHERE mov.fecha BETWEEN ? AND ?
      GROUP BY mov.fecha 
    `;
    const data = await getConnection().query(query, [from, to]);

    return [...data];
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
      .orderBy("movimientos.fecha", "ASC")
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
      .orderBy("movimientos.fecha", "ASC")
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
      .orderBy("movimientos.fecha", "ASC")
      .skip(skipRecords)
      .take(pageSize)
      .getMany();

    return { data, ...count };
  }
}
