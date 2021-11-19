import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToMany } from 'typeorm';
import { Productos } from './Productos';


@Entity('categorias')
export class Categorias extends BaseEntity {

    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'varchar', nullable: false })
    categoria: string;

    @Column({ type: 'boolean', default: true })
    activo: boolean;

    @ManyToMany(type => Productos, producto => producto.talles)
    producto: Productos[];

    static getPaginated(pageNro: number, pageSize: number) {
        const skipRecords = pageNro * pageSize;
        return this.createQueryBuilder("categoria")
            .orderBy("categoria.id", "DESC")
            .skip(skipRecords)
            .take(pageSize)
            .getMany();
    }

}

