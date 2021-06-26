import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Productos } from './Productos';

@Entity('proveedores')
export class Proveedores extends BaseEntity {

    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'varchar', length: 150, nullable: false })
    proveedor: string;

    @Column({ type: 'boolean', default: true })
    activo: boolean;

    @OneToMany(type => Productos, producto => producto.proveedor)
    producto: Productos[];

    static getProveedoresPaginated(pageNro: number, pageSize: number) {
        const skipRecords = pageNro * pageSize;
        return this.createQueryBuilder("proveedores")
            .orderBy("proveedores.id", "DESC")
            .skip(skipRecords)
            .take(pageSize)
            .getMany();
    }
}
