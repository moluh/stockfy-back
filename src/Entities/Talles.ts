import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany } from 'typeorm';
import { Productos } from './Productos';

@Entity('talles')
export class Talles extends BaseEntity {

    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;
    
    @Column({ type: 'varchar', nullable: false })
    talle: string;

    @ManyToMany(type => Productos, producto => producto.talles)
    producto: Productos[];

}

