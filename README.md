
#  CONTROL STOCK API

  

##  Pasos para levantar el entorno:

En la raíz del proyecto:

>  npm install

>  npm install -g nodemon

>  npm install -g ts-node
 
###  Generar Script SQL:

Para generar y correr el script SQL hay que tener configurado en `ormconfig.json` con `src`.

```
"entities": [
	"src/Entities/**/*{.ts,.js}" 
],
"migrations": [
	"src/migration/**{.ts,.js}"
]
```
  
Windows:
>  ts-node node_modules\typeorm\cli.js migration:generate -n NombreMigracion

Linux:
>  ts-node node_modules/typeorm/cli.js migration:generate -n NombreMigracion

###  Ejecutar Script:

Windows:
>  ts-node node_modules\typeorm\cli.js migration:run

Linux:
>  ts-node node_modules/typeorm/cli.js migration:run

###  Variables de entorno:

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
PKEY=PRIVATE-KEY
PORT=8080
NODE_ENV=PROD
TOKEN_EXPIRATION=9h

SQL_USER=lucas
SQL_PASSWORD=pass
SQL_DB_NAME=controlstock
BACKUPS_DIR=/home/backups
```

###  Arrancar Proyecto


Antes de correr el proyecto, en `ormconfig.json` cambiar la configuración de `src` a `dist`.

```
"entities": [
	"dist/Entities/**/*{.ts,.js}"
]
"migrations": [
	"dist/migration/**{.ts,.js}"
]
```

Ejecutar:

>  nodemon exec -e ts,env,json

## Carga de datos

Desde Postman: `/api/v1/usuarios` crear el primer usuario de prueba con rol "ADMIN":

```
{
    "username": "test",
    "email": "test@test.com",
    "password": "test01",
    "role": "ADMIN"
}
```

En la carpeta `data/csv` están los libros de archivos para cargar datos y hacer pruebas.
Todos los libros hay que importarlos desde phpMyAdmin o algún otro gestor de BD. El único 
que se puede importar desde la app, es el **LibroProductos**, que se lo carga desde la pestaña productos, pero antes se deben importar las **MARCAS, CATEGORIAS y PROVEEDORES**. 
