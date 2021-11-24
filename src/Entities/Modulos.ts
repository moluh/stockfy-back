import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from "typeorm";
import { Permisos } from "./Permisos";
import { Roles } from "./Roles";

@Entity('modulos')
export class Modulos extends BaseEntity {

    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'varchar', length: 150, nullable: false })
    modulo: string;

    @Column({ type: 'boolean', default: true })
    activo: boolean;

    @ManyToOne(type => Modulos, modulo => modulo.role)
    role: Roles;

    @OneToMany(type => Permisos, permiso => permiso.modulo)
    permiso: Permisos[];

    static getModulosPaginated(pageNro: number, pageSize: number) {
        const skipRecords = pageNro * pageSize;
        return this.createQueryBuilder("modulos")
            .orderBy("modulos.id", "DESC")
            .skip(skipRecords)
            .take(pageSize)
            .getMany();
    }
    
}
