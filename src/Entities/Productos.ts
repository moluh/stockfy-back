import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Marcas } from "./Marcas";
import { Categorias } from "./Categorias";
import { Imagenes } from "./Imagenes";
import { Proveedores } from "./Proveedores";
import { Talles } from "./Talles";
import * as iqa from "./../helpers/isQueryAllowed";

@Entity("productos")
export class Productos extends BaseEntity {
  @PrimaryGeneratedColumn("increment", { type: "integer" })
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  nombre: string;

  @Column({ type: "text", length: 255, nullable: false })
  descripcion: string;

  @Column({ type: "int", nullable: false })
  unidad: number;

  @Column({ type: "boolean", default: false })
  archivado: boolean;

  @Column({ type: "int", nullable: true })
  alto: number;

  @Column({ type: "int", nullable: true })
  ancho: number;

  @Column({ type: "int", nullable: true })
  profundidad: number;

  @Column({ type: "int", nullable: true })
  peso: number;

  @Column({ type: "double", nullable: true })
  precio_costo: number;

  @Column({ type: "double", nullable: true })
  precio_venta: number;

  @Column({ type: "boolean", default: true })
  disponible: boolean;

  @Column({ type: "int", nullable: true })
  rebaja: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  sku: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  ean: string;

  @Column({ type: "int", nullable: true })
  stock_actual: number;

  @Column({ type: "varchar", length: 150, nullable: true })
  codigo_fabricante: string;

  @ManyToOne((type) => Proveedores, (prov) => prov.id)
  proveedor: Proveedores;

  @ManyToOne((type) => Marcas, (marca) => marca.id)
  marca: Marcas;

  @ManyToOne((type) => Categorias, (cat) => cat.id)
  categoria_uno: Categorias;

  @ManyToOne((type) => Categorias, (cat) => cat.id)
  categoria_dos: Categorias;

  @OneToMany((type) => Imagenes, (img) => img.producto)
  imagenes: Imagenes[];

  @ManyToMany((type) => Talles, (talle) => talle.producto, { cascade: true })
  @JoinTable()
  talles: Talles[];

  /**
   * 
  static getFilterAndPag(
    pageNro: number,
    pageSize: number,
    marcaId: number,
    catUnoId: number,
    catDosId: number,
    minPrice: number,
    maxPrice: number,
    talle: string
  ) {
    const skipRecords = pageNro * pageSize;

    return this.createQueryBuilder("producto")
      .innerJoinAndSelect(
        "producto.marca",
        "marca",
        marcaId ? `marca."id" = :marcaId` : "1=1",
        { marcaId }
      )
      .innerJoinAndSelect(
        "producto.categoria_uno",
        "cat_one",
        catUnoId ? `cat_one."id" = :catUnoId` : "1=1",
        { catUnoId }
      )
      .innerJoinAndSelect(
        "producto.categoria_dos",
        "cat_two",
        catDosId ? `cat_two."id" = :catDosId` : "1=1",
        { catDosId }
      )
      .leftJoinAndSelect("producto.talles", "talle")
      .leftJoinAndSelect("producto.proveedor", "proveedor")
      .leftJoinAndSelect("producto.imagenes", "img")
      .andWhere(minPrice ? `producto."precio_venta" >= :minPrice` : "1=1", {
        minPrice,
      })
      .andWhere(maxPrice ? `producto."precio_venta" <= :maxPrice` : "1=1", {
        maxPrice,
      })
      .orderBy("producto.id", "DESC")
      .skip(skipRecords)
      .take(pageSize)
      .getMany();
  }
   */

  static getPaginated(pageNro: number, pageSize: number) {
    const skipRecords = pageNro * pageSize;
    return this.createQueryBuilder("producto")
      .leftJoinAndSelect("producto.marca", "mar")
      .leftJoinAndSelect("producto.categoria_uno", "cat_uno")
      .leftJoinAndSelect("producto.categoria_dos", "cat_dos")
      .leftJoinAndSelect("producto.proveedor", "proveedor")
      .leftJoinAndSelect("producto.imagenes", "img")
      .leftJoinAndSelect("producto.talles", "talle")
      .where("producto.archivado = 0")
      .orderBy("producto.id", "DESC")
      .skip(skipRecords)
      .take(pageSize)
      .getMany();
  }

  static getPaginatedByState(pageNro: number, pageSize: number, state: any) {
    const skipRecords = pageNro * pageSize;
    const val: number = state === 'true' ? 1 : 0;    
    return this.createQueryBuilder("producto")
      .leftJoinAndSelect("producto.marca", "mar")
      .leftJoinAndSelect("producto.categoria_uno", "cat_uno")
      .leftJoinAndSelect("producto.categoria_dos", "cat_dos")
      .leftJoinAndSelect("producto.proveedor", "proveedor")
      .leftJoinAndSelect("producto.imagenes", "img")
      .leftJoinAndSelect("producto.talles", "talle")
      .where(`producto.archivado = :val`, { val })
      .orderBy("producto.id", "DESC")
      .skip(skipRecords)
      .take(pageSize)
      .getMany();
  }

  static async getPaginatedAndFilter(
    pageNro: number,
    pageSize: number,
    attr: string,
    text: any
  ) {
            
    try {
      await iqa.isQueryAllowed([attr]);
    } catch (error) {
      return error;
    }
    const skipRecords = pageNro * pageSize;
    
    return this.createQueryBuilder("producto")
      .leftJoinAndSelect("producto.marca", "mar")
      .leftJoinAndSelect("producto.categoria_uno", "cat_uno")
      .leftJoinAndSelect("producto.categoria_dos", "cat_dos")
      .leftJoinAndSelect("producto.proveedor", "proveedor")
      .leftJoinAndSelect("producto.talles", "talle")
      .leftJoinAndSelect("producto.imagenes", "img")
      .where(`LOWER(producto.${attr}) LIKE LOWER(:val)`, { val: `%${text}%` })
      .andWhere("producto.archivado = 0")
      .orderBy("producto.id", "DESC")
      .skip(skipRecords)
      .take(pageSize)
      .getMany();
  }

  // puede ser la lista de marcas, categorias o proveedores
  static async getPaginatedByIdOfAList(
    pageNro: number,
    pageSize: number,
    attr: string,
    id: number
  ) {
            
    try {
      await iqa.isQueryAllowed([attr]);
    } catch (error) {
      return error;
    }

    const skipRecords = pageNro * pageSize;
    if (attr === "categoria_uno") {
      console.log("Paginando por categoria");
      return this.createQueryBuilder("producto")
        .leftJoinAndSelect("producto.marca", "mar")
        .leftJoinAndSelect("producto.categoria_uno", "cat_uno")
        .leftJoinAndSelect("producto.categoria_dos", "cat_dos")
        .leftJoinAndSelect("producto.talles", "talle")
        .leftJoinAndSelect("producto.proveedor", "proveedor")
        .leftJoinAndSelect("producto.imagenes", "img")
        .where(`producto.categoria_uno = :id`, { id })
        .orWhere(`producto.categoria_dos = :id`, { id })
        .andWhere("producto.archivado = 0")
        .orderBy("producto.id", "DESC")
        .skip(skipRecords)
        .take(pageSize)
        .getMany();
    } else {
      // marca, proveedores.. falta talles
      console.log("Paginando por id de una lista");
      return this.createQueryBuilder("producto")
        .leftJoinAndSelect("producto.marca", "mar")
        .leftJoinAndSelect("producto.categoria_uno", "cat_uno")
        .leftJoinAndSelect("producto.categoria_dos", "cat_dos")
        .leftJoinAndSelect("producto.talles", "talle")
        .leftJoinAndSelect("producto.proveedor", "proveedor")
        .leftJoinAndSelect("producto.imagenes", "img")
        .where(`producto.${attr} = :id`, { id })
        .andWhere("producto.archivado = 0")
        .orderBy("producto.id", "DESC")
        .skip(skipRecords)
        .take(pageSize)
        .getMany();
    }
  }
}
