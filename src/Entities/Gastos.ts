import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";


@Entity('gastos')
export class Gastos extends BaseEntity {

    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'timestamp', nullable: false })
    fecha_hora: Date;

    @Column({ type: 'varchar', length: 255, nullable: true })
    descripcion: string;

    @Column({ type: 'double', nullable: false })
    monto: number;
    
    static getPaginated(pageNro: number, pageSize: number) {
        const skipRecords = pageNro * pageSize;
        return this.createQueryBuilder("gastos")
            .orderBy("gastos.id", "DESC")
            .skip(skipRecords)
            .take(pageSize)
            .getMany();
    }
    
}
