
#  CONTROL STOCK API

  

##  Pasos para levantar el entorno:

En la raíz del proyecto:

>  npm install

>  npm install -g nodemon

>  npm install -g ts-node
 
###  Generar Script SQL:

Windows:
>  ts-node node_modules\typeorm\cli.js migration:generate -n init

Linux:
>  ts-node node_modules/typeorm/cli.js migration:generate -n init

###  Ejecutar Script:

Windows:
>  ts-node node_modules\typeorm\cli.js migration:run

Linux:
>  ts-node node_modules/typeorm/cli.js migration:run

###  Variables de entorno:

Crear un archivo `.env` en la raíz del proyecto siguiendo el modelo de variables que se encuentra en `._env`:

###  Ejecutar Proyecto

>  nodemon exec -e ts,env,json

## Carga de datos

Desde Postman: `/api/v1/usuarios` crear el primer usuario de prueba con rol "ADMIN":

```
{
    "username": "test",
    "email": "test@test.com",
    "password": "test01",
    "roles": ["ADMIN"]
}
```

En la carpeta `database/csv` están los libros de archivos para cargar datos y hacer pruebas.
Todos los libros hay que importarlos desde phpMyAdmin o algún otro gestor de BD. El único 
que se puede importar desde la app, es el **LibroProductos**, que se lo carga desde la pestaña productos, pero antes se deben importar las **MARCAS, CATEGORIAS y PROVEEDORES**. 
