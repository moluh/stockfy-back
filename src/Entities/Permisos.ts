import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from "typeorm";
import { Modulos } from "./Modulos";

@Entity('permisos')
export class Permisos extends BaseEntity {

    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'varchar', length: 150, nullable: false })
    permiso: string;

    @Column({ type: 'boolean', default: true })
    activo: boolean;

    @ManyToOne(type => Modulos, modulo => modulo.permiso)
    modulo: Modulos;

    static getPermisosPaginated(pageNro: number, pageSize: number) {
        const skipRecords = pageNro * pageSize;
        return this.createQueryBuilder("permisos")
            .orderBy("permisos.id", "DESC")
            .skip(skipRecords)
            .take(pageSize)
            .getMany();
    }
    
}
