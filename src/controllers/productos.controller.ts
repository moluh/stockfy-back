import { Productos } from "../entities/Productos";
import { Request, Response } from "express";
import { ImagenesController } from "./imagenes.controller";
import { Imagenes } from "../entities/Imagenes";
import * as fs from "fs";
import * as fastcsv from "fast-csv";
import { ApiResponse } from "../api/response";
import { getConnection } from "typeorm";

interface MulterRequest extends Request {
  file: any;
}

export class ProductosController {
  constructor() {}

  public ctl_Imagenes: ImagenesController = new ImagenesController();

  public async uploadCSV(req: MulterRequest, res: Response) {
    const pathOfCvs: string = `${process.env.FILES_DIR}/csv/${req.file.filename}`;
    const stream = fs.createReadStream(pathOfCvs);
    let csvData: any | any[] = [];
    const csvStream = fastcsv
      .parse({ delimiter: ";" })
      .on("error", (error) => res.json({ error: error }))
      .on("data", function (data) {
        csvData.push(data);
      })
      .on("end", async function () {
        /**
         * Buscamos los indexs de cada atributo, para asi asignarlo despues a su correcto
         * orden. Esto posibilita que el cliente pueda tener organizado de diferente manera
         * su libro de productos. Solamente debe respetar los nombres de la base de datos.
         * 
         * 
         * // TODO: permitir que el cliente cargue su propia estructura de datos y de nombre 
         * de los productos(ej: en vez de "nombre" quizás el cliente tenga su propio excel 
         * con el atributo "titulo") entonces desde front seleccionar los headers del excel 
         * que se carga y que pueda matchear con los atributos de producto de nuestra base de datos.
         * 
         */
        let responses = [];
        let errors = [];
        let header: any = {
          id: csvData[0].findIndex((h) => h === "id"),
          ean: csvData[0].findIndex((h) => h === "ean"),
          nombre: csvData[0].findIndex((h) => h === "nombre"),
          stock_actual: csvData[0].findIndex((h) => h === "stock_actual"),
          marca: csvData[0].findIndex((h) => h === "marcaId"),
          categorias: csvData[0].findIndex((h) => h === "categoriaId"),
          proveedor: csvData[0].findIndex((h) => h === "proveedorId"),
          descripcion: csvData[0].findIndex((h) => h === "descripcion"),
          disponible: csvData[0].findIndex((h) => h === "disponible"),
          rebaja: csvData[0].findIndex((h) => h === "rebaja"),
          precio_costo: csvData[0].findIndex((h) => h === "precio_costo"),
          precio_venta: csvData[0].findIndex((h) => h === "precio_venta"),
          sku: csvData[0].findIndex((h) => h === "sku"),
          codigo_fabricante: csvData[0].findIndex(
            (h) => h === "codigo_fabricante"
          ),
          unidad: csvData[0].findIndex((h) => h === "unidad"),
          archivado: csvData[0].findIndex((h) => h === "archivado"),
          alto: csvData[0].findIndex((h) => h === "alto"),
          ancho: csvData[0].findIndex((h) => h === "ancho"),
          profundidad: csvData[0].findIndex((h) => h === "profundidad"),
          peso: csvData[0].findIndex((h) => h === "peso"),
        };
        // eliminamos el header..
        csvData.shift();

        try {
          for (let i = 0; i < csvData.length; i++) {
            await getConnection()
              .createQueryBuilder()
              .insert()
              .into(Productos)
              .values({
                id: csvData[i][header.id],
                ean: csvData[i][header.ean],
                nombre: csvData[i][header.nombre],
                stock_actual: csvData[i][header.stock_actual],
                marca: csvData[i][header.marca],
                categorias: csvData[i][header.categorias],
                proveedor: csvData[i][header.proveedor],
                descripcion: csvData[i][header.descripcion],
                disponible: csvData[i][header.disponible],
                rebaja: parseFloat(csvData[i][header.rebaja]) || 0,
                precio_costo: parseFloat(csvData[i][header.precio_costo]) || 0,
                precio_venta: parseFloat(csvData[i][header.precio_venta]) || 0,
                sku: csvData[i][header.sku],
                codigo_fabricante: csvData[i][header.codigo_fabricante],
                unidad: csvData[i][header.unidad],
                archivado: csvData[i][header.archivado],
                alto: parseInt(csvData[i][header.alto]) || 0,
                ancho: parseInt(csvData[i][header.ancho]) || 0,
                profundidad: parseInt(csvData[i][header.profundidad]) || 0,
                peso: parseInt(csvData[i][header.peso]) || 0,
              })
              .orUpdate({
                conflict_target: ["id"],
                overwrite: [
                  "ean",
                  "nombre",
                  "stock_actual",
                  "marcaId",
                  "categoriaUnoId",
                  "categoriaDosId",
                  "proveedorId",
                  "descripcion",
                  "disponible",
                  "rebaja",
                  "precio_costo",
                  "precio_venta",
                  "sku",
                  "codigo_fabricante",
                  "unidad",
                  "archivado",
                  "alto",
                  "ancho",
                  "profundidad",
                  "peso",
                ],
              })
              .execute()
              .then((res) => responses.push(res))
              .catch((error) => errors.push(error));
          }
        } catch (error) {
          errors.push(error);
        }

        if (errors.length !== 0) res.json(errors);
        else res.json(responses);
      });

    csvData = [];
    stream.pipe(csvStream);
  }

  public getByEanCode(req: Request, res: Response) {
    const ean = req.params.ean;
    Productos.findOne(
      { ean }
      //  { relations: ["marcaId", "categoriaUnoId", "categoriaDosId", "proveedorId"]     }
    )
      .then((data) => ApiResponse(res, true, 200, data, []))
      .catch((err) => ApiResponse(res, false, 400, [], err));
  }

  getPaginatedByState(req: Request, res: Response) {
    let pageNro: any = req.query.pageNro || 0;
    let pageSize: any = req.query.pageSize;
    let state: any = req.query.state;

    Productos.getPaginatedByState(pageNro, pageSize, state)
      .then((data) => ApiResponse(res, true, 200, data, []))
      .catch((err) => ApiResponse(res, false, 400, [], err));
  }

  /**
   * 
  public getFilterAndPag(req: Request, res: Response) {
    let marcaId: any = req.query.marcaId;
    let catUnoId: any = req.query.catUnoId;
    let catDosId: any = req.query.catDosId;
    let minPrice: any = req.query.minPrice;
    let maxPrice: any = req.query.maxPrice;
    let pageNro: any = req.query.pageNro;
    let pageSize: any = req.query.pageSize;
    let talle: any = req.query.talle;

    Productos.getFilterAndPag(
      pageNro,
      pageSize,
      marcaId,
      catUnoId,
      catDosId,
      minPrice,
      maxPrice,
      talle
    )
      .then((data) => ApiResponse(res, true, 200, data, []))
      .catch((err) => ApiResponse(res, false, 400, [], err));
  }
  */

  public getPaginatedByIdOfAList(req: Request, res: Response) {
    let pageNro: any = req.query.pageNro || 0;
    let pageSize: any = req.query.pageSize;
    let attr: any = req.query.attr;
    let id: any = req.query.id;

    Productos.getPaginatedByIdOfAList(pageNro, pageSize, attr, parseInt(id))
      .then((data) => ApiResponse(res, true, 200, data, []))
      .catch((err) => ApiResponse(res, false, 400, [], err));
  }

  getPaginatedAndFilter(req: Request, res: Response) {
    let pageNro: any = req.query.pageNro || 0;
    let pageSize: any = req.query.pageSize;
    let attr: any = req.query.attr;
    let text: any = req.query.text;

    Productos.getPaginatedAndFilter(pageNro, pageSize, attr, text)
      .then((data) => ApiResponse(res, true, 200, data, []))
      .catch((err) => ApiResponse(res, false, 400, [], err));
  }

  public getPaginated(req: Request, res: Response) {
    let pageNro: any = req.query.pageNro || 0;
    let pageSize: any = req.query.pageSize;

    Productos.getPaginated(pageNro, pageSize)
      .then((data) => ApiResponse(res, true, 200, data, []))
      .catch((err) => ApiResponse(res, false, 400, [], err));
  }

  public getAll(_req: Request, res: Response) {
    Productos.find({
      order: { nombre: "ASC" },
      //relations: ["marcaId", "categoriaUnoId", "categoriaDosId", "proveedorId", "imagenes"],
    })
      .then((data) => ApiResponse(res, true, 200, data, []))
      .catch((err) => ApiResponse(res, false, 400, [], err));
  }

  public get(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    Productos.findOne(
      { id }
      //{ relations: ["marcaId", "categoriaUnoId", "categoriaDosId", "proveedorId", "imagenes"] }
    )
      .then((data) => ApiResponse(res, true, 200, data, []))
      .catch((err) => ApiResponse(res, false, 400, [], err));
  }

  public changeState(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    Productos.findOne({ id })
      .then((prod: Productos) => {
        prod.archivado = !prod.archivado;
        prod
          .save()
          .then((data) => ApiResponse(res, true, 200, data, []))
          .catch((err) => ApiResponse(res, false, 400, [], err));
      })
      .catch((err) => ApiResponse(res, false, 400, [], err));
  }

  // ==============================================================
  public create(req: Request, res: Response) {
    const producto = Productos.create({ ...req.body } as Object);
    producto
      .save()
      .then((data) => ApiResponse(res, true, 200, data, []))
      .catch((err) => ApiResponse(res, false, 400, [], err));
  }

  public async createImgAndAssignToArt(req: MulterRequest, res: Response) {
    // Guardamos el ID del producto para luego buscarlo y asociarlo a la imagen
    let idArt: any = req.query.idArt;
    let idImg: number;
    let arrIdImagenes: any[] = [];
    let producto: Productos;

    const img = new Imagenes();
    img.img_thumb = req.body.img_thumb;
    img.url = `${req.file.filename} `; // Asignamos mismo nombre con el que se guardo el archivo

    // Creamos una imagen en la tabla de Imagenes
    await new Promise<void>((resolve, reject) => {
      console.log("Creamos una imagen en la tabla de Imagenes");
      img
        .save()
        .then((img) => {
          idImg = img.id;
          console.log("Se creo la img correctamente");
          if (idArt) {
            resolve();
          } else {
            res.json(img);
          }
        })
        .catch((err) => {
          res.json(err);
          return reject(err);
        });
    });

    // Si se envió un id de producto, realizamos lo siguiente, sino, solo se carga la imagen
    if (idArt) {
      // Una vez creada la imagen, buscamos el producto
      await new Promise<void>((resolve, reject) => {
        console.log("Creada la imagen, buscamos el producto");
        Productos.findOne({ id: idArt }, { relations: ["imagenes"] })
          .then((art) => {
            console.log("Producto encontrado:", art);

            producto = art;
            resolve();
          })
          .catch((err) => {
            res.json(err);
            return reject(err);
          });
      });

      // Si encuentra el producto, le asignamos la imagen
      await new Promise<void>((resolve, reject) => {
        console.log("Actualizando producto");
        arrIdImagenes = producto.imagenes;
        arrIdImagenes.push({ id: idImg });
        producto.imagenes = arrIdImagenes;

        producto
          .save()
          .then((producto) => {
            console.log("Se editó el artículo con su imagen");
            res.json(producto);
            resolve();
          })
          .catch((err) => {
            res.json(err);
            return reject(err);
          });
      });
    }
  }

  public update(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    Productos.findOne({ id })
      .then((producto) => {
        producto.nombre = req.body.nombre;
        producto.descripcion = req.body.descripcion;
        producto.categorias = req.body.categorias;
        producto.talles = req.body.talles;
        producto.proveedor = req.body.proveedor;
        producto.codigo_fabricante = req.body.codigo_fabricante;
        producto.marca = req.body.marca;
        producto.imagenes = req.body.imagenes;
        producto.precio_costo = req.body.precio_costo;
        producto.precio_venta = req.body.precio_venta;
        producto.stock_actual = req.body.stock_actual;
        producto.sku = req.body.sku;
        producto.rebaja = req.body.rebaja;
        producto.archivado = req.body.archivado;
        producto.disponible = req.body.disponible;
        producto.disponible = req.body.disponible;
        producto.unidad = req.body.unidad;
        producto.peso = req.body.peso;
        producto.profundidad = req.body.profundidad;
        producto.alto = req.body.alto;
        producto.ancho = req.body.ancho;
        producto
          .save()
          .then((data) => ApiResponse(res, true, 200, data, []))
          .catch((err) => ApiResponse(res, false, 400, [], err));
      })
      .catch((err) => ApiResponse(res, false, 400, [], err));
  }

  public updateStockProducto(prod) {
    const id = prod.id_producto;

    return new Promise((resolve) => {
      Productos.findOne({ id })
        .then((producto: Productos) => {
          producto.stock_actual -= prod.cantidad;
          producto
            .save()
            .then((_resp) => {
              console.log("Se actualizó el stock");
              resolve(true);
            })
            .catch((err) => console.log("Error al actualizar stock", err));
        })
        .catch((err) => console.log("No se encontro el producto", err));
    });
  }

  public delete(req: Request, res: Response) {
    let id = parseInt(req.params.id);
    Productos.findOne({ id })
      .then((producto) => {
        producto
          .remove()
          .then((data) => ApiResponse(res, true, 200, data, []))
          .catch((err) => ApiResponse(res, false, 400, [], err));
      })
      .catch((err) => ApiResponse(res, false, 400, [], err));
  }
}
