import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, OneToMany } from 'typeorm';
import { Modulos } from './Modulos';
import { Productos } from './Productos';
import { Usuarios } from './Usuarios';


@Entity('roles')
export class Roles extends BaseEntity {

    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;
    
    @Column({ type: 'varchar', nullable: false })
    role: string;
    
    @Column({ type: 'varchar', nullable: false, default: "" })
    descripcion: string;
    
    @Column({ type: 'int', nullable: false, default: 1 })
    nivel: number;

    @ManyToMany(type => Usuarios, usuario => usuario.roles)
    usuario: Usuarios[];

    @OneToMany(type => Modulos, modulo => modulo.role)
    modulo: Modulos[];

}