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
import { Pagos } from "./Pagos";
import * as iqa from "./../helpers/isQueryAllowed";
import { Usuarios } from "./Usuarios";

@Entity("movimientos")
export class Movimientos extends BaseEntity {
  @PrimaryGeneratedColumn("increment", { type: "integer" })
  id: number;

  @Column({ type: "date", nullable: true })
  fecha: Date;

  @Column({ type: "time", nullable: true })
  hora: Date;

  @Column({ type: "varchar", length: 255, nullable: true })
  comentario: string;

  /** PENDIENTE COMPLETADO ANULADO */
  @Column({ type: "char", length: 1, nullable: true })
  estado: string;

  @Column({ type: "double", nullable: false })
  total: number;

  /** EFECTIVO CTACTE TARJETA */
  @Column({ type: "varchar", nullable: true })
  modo_pago: string;

  @Column({ type: "double", nullable: true })
  saldo: number;

  @ManyToOne((type) => Usuarios, (usuario) => usuario.id)
  usuario: Usuarios;

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

  static async getPaginatedByClientId(
    pageNro: number,
    pageSize: number,
    clientId: string
  ) {
    const skipRecords = pageNro * pageSize;
    const count = await this.createQueryBuilder("movimientos")
      .select("COUNT(*)", "count")
      .getRawOne();

    const data = await this.createQueryBuilder("movimientos")
      .leftJoinAndSelect("movimientos.cliente", "mc")
      .leftJoinAndSelect("movimientos.movimiento_lineas", "pl")
      .leftJoinAndSelect("movimientos.pagos", "pagos")
      .where(`movimientos.clienteId = :clientId`, { clientId })
      .orderBy("movimientos.fecha", "ASC")
      .skip(skipRecords)
      .take(pageSize)
      .getMany();

    return { data, ...count };
  }

  static async getPaginatedByDate(
    pageNro: number,
    pageSize: number,
    date: string
  ) {
    const skipRecords = pageNro * pageSize;
    const count = await this.createQueryBuilder("movimientos")
      .select("COUNT(*)", "count")
      .getRawOne();

    const data = await this.createQueryBuilder("movimientos")
      .leftJoinAndSelect("movimientos.cliente", "mc")
      .leftJoinAndSelect("movimientos.movimiento_lineas", "pl")
      .leftJoinAndSelect("movimientos.pagos", "pagos")
      .where(`movimientos.fecha LIKE :date`, { date })
      .orderBy("movimientos.fecha", "ASC")
      .skip(skipRecords)
      .take(pageSize)
      .getMany();

    return { data, ...count };
  }

  static async getPaginatedBetweenDates(
    pageNro: number,
    pageSize: number,
    from: string,
    to: string
  ) {
    const skipRecords = pageNro * pageSize;
    const count = await this.createQueryBuilder("movimientos")
      .select("COUNT(*)", "count")
      .getRawOne();

    const data = await this.createQueryBuilder("movimientos")
      .leftJoinAndSelect("movimientos.cliente", "mc")
      .leftJoinAndSelect("movimientos.movimiento_lineas", "pl")
      .leftJoinAndSelect("movimientos.pagos", "pagos")
      .where(`movimientos.fecha BETWEEN :from AND :to`, { from, to })
      .orderBy("movimientos.fecha", "ASC")
      .skip(skipRecords)
      .take(pageSize)
      .getMany();

    return { data, ...count };
  }

  static async getPaginatedAndFilter(
    pageNro: number,
    pageSize: number,
    attr: string,
    txt: string
  ) {
    try {
      if (attr !== "modo_pago") await iqa.isQueryAllowed([attr, txt]);
    } catch (error) {
      return error;
    }

    const skipRecords = pageNro * pageSize;
    const count = await this.createQueryBuilder("movimientos")
      .select("COUNT(*)", "count")
      .getRawOne();

    const data = await this.createQueryBuilder("movimientos")
      .leftJoinAndSelect("movimientos.cliente", "mc")
      .leftJoinAndSelect("movimientos.movimiento_lineas", "pl")
      .leftJoinAndSelect("movimientos.pagos", "pagos")
      .where(`LOWER(movimientos.${attr}) LIKE LOWER(:val)`, { val: `%${txt}%` })
      .orderBy("movimientos.fecha", "ASC")
      .skip(skipRecords)
      .take(pageSize)
      .getMany();

    return { data, ...count };
  }

  static async getStatisticsBetweenDates(from, to) {
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

  static async getStatisticsBetweenDatesGraphic(from, to) {
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

}
