import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";

@Entity('modulos')
export class Modulos extends BaseEntity {

    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'varchar', length: 150, nullable: false })
    modulo: string;

    @Column({ type: 'boolean', default: true })
    activo: boolean;

    static getModulosPaginated(pageNro: number, pageSize: number) {
        const skipRecords = pageNro * pageSize;
        return this.createQueryBuilder("modulos")
            .orderBy("modulos.id", "DESC")
            .skip(skipRecords)
            .take(pageSize)
            .getMany();
    }
    
}
