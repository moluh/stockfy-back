
#  CONTROL STOCK API

  

##  Pasos para levantar el entorno:

En la raíz del proyecto:

>  npm install

>  npm install -g nodemon

>  npm install -g ts-node
 
###  Generar Script SQL:
  
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

    PKEY=PRIVATE-KEY
    PORT=8080
    NODE_ENV=PROD
    TOKEN_EXPIRATION=9h

###  Arrancar Proyecto

>  nodemon exec
