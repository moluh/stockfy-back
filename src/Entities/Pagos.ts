import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Movimientos } from "./Movimientos";


@Entity('pagos')
export class Pagos extends BaseEntity {

    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'double', nullable: false })
    monto: number;

    @Column({ type: "date", nullable: false })
    fecha: Date;
    
    @Column({ type: "time", nullable: true })
    hora: Date;

    @Column({ type: 'double', nullable: false, default: 0 })
    ganancia: number;

    @Column({ type: 'boolean', nullable: true })
    interes: boolean;

    @Column({ type: 'double', nullable: false, default: 0 })
    tasa_interes: number;

    @Column({ type: 'int', nullable: false, default: 1 })
    pago_nro: number;

    @ManyToOne(type => Movimientos, movimiento => movimiento.pagos, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    movimiento: Movimientos;

    static getPaginated(pageNro: number, pageSize: number) {
        const skipRecords = pageNro * pageSize;
        return this.createQueryBuilder('pago')
            .orderBy('pago.fecha', 'ASC')
            .offset(skipRecords)
            .limit(pageSize)
            .getMany();
    }

}