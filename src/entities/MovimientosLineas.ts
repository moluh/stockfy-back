import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToMany,
    JoinColumn,
} from 'typeorm'
import { Movimientos } from './Movimientos'

@Entity('movimientoslineas')
export class MovimientosLineas extends BaseEntity {
    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number

    @Column({ type: 'bigint', nullable: false })
    id_producto: number

    @Column({ type: 'int', nullable: false })
    cantidad: number

    @Column({ type: 'int', nullable: false })
    unidad: number

    @Column({ type: 'varchar', nullable: true })
    img: string

    @Column({ type: 'varchar', length: 255, nullable: false })
    nombre: string

    @Column({ type: 'varchar', length: 255, nullable: false })
    descripcion: string

    @Column({ type: 'real', nullable: false })
    precio_venta: number

    @Column({ type: 'real', nullable: true })
    precio_oferta: number

    @Column({ type: 'real', default: 0, nullable: true })
    porcentaje: number

    @Column({ type: 'boolean', nullable: true, default: false })
    oferta: boolean

    @ManyToMany(
        (type) => Movimientos,
        (movimiento) => movimiento.movimiento_lineas
    )
    movimiento: Movimientos[]
}
