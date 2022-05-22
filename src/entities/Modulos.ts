import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToMany,
} from 'typeorm'
import { Usuarios } from './Usuarios'

@Entity('modulos')
export class Modulos extends BaseEntity {
    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number

    /**
     * Permisos de los modulos diferenciados por la inicial de cada uno
     *
     * Ej:
     * { id: 1, module: "PRODUCTOS_A" },
     *
     * "PRODUCTOS_A" = ALL
     * "PRODUCTOS_R" = READ
     * "PRODUCTOS_W" = WRITE
     * "PRODUCTOS_M" = MODIFY
     * "PRODUCTOS_D" = DELETE
     */
    @Column({ type: 'varchar', length: 150, nullable: false })
    modulo: string

    @Column({ type: 'boolean', default: true })
    activo: boolean

    @ManyToMany((type) => Usuarios, (usuario) => usuario.modulos)
    usuario: Usuarios[]

    static getModulosPaginated(pageNro: number, pageSize: number) {
        const skipRecords = pageNro * pageSize
        return this.createQueryBuilder('modulos')
            .orderBy('modulos.id', 'DESC')
            .skip(skipRecords)
            .take(pageSize)
            .getMany()
    }
}
