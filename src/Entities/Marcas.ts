import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Productos } from './Productos';

@Entity('marcas')
export class Marcas extends BaseEntity {

    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'varchar', length: 20, nullable: false })
    marca: string;

    @Column({ type: 'boolean', default: true })
    activo: boolean;

    @OneToMany(type => Productos, producto => producto.marca)
    producto: Productos[];

    static getMarcasPaginated(pageNro: number, pageSize: number) {
        const skipRecords = pageNro * pageSize;
        return this.createQueryBuilder("marcas")
            .orderBy("marcas.id", "DESC")
            .skip(skipRecords)
            .take(pageSize)
            .getMany();
    }
    
}
