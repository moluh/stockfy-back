import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { Productos } from './Productos';

@Entity('imagenes')
export class Imagenes extends BaseEntity {

    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'text', nullable: true })
    img_thumb: string;

    @Column({ type: 'text', nullable: true })
    url: string;

    @ManyToOne(type => Productos, producto  => producto.imagenes)
    producto: Productos;

}

