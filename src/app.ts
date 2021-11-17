import { Config } from './config/config'
const config: Config = new Config();

// import { createConnection, Connection } from 'typeorm';
import compression from 'compression';
import helmet from 'helmet';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import * as http from 'http';

// Routes
import { UsuariosRouter } from './routes/usuarios.routes';
import { LoginRoutes } from './routes/login.routes';
import { MarcasRouter } from './routes/marcas.routes';
import { GastosRouter } from './routes/gastos.routes';
import { PagosRouter } from './routes/pagos.routes';
import { ProductosRouter } from './routes/productos.routes';
import { CategoriasRouter } from './routes/categorias.routes';
import { ImagenesRouter } from './routes/imagenes.routes';
import { ProveedoresRouter } from './routes/proveedores.routes';
import { ClientesRouter } from './routes/clientes.routes';
import { TallesRouter } from './routes/talles.routes';
import { EstadisticasRouter } from './routes/estadisticas.routes';
import { MovimientosRouter } from './routes/movimientos.routes';
import { FilesUploadProductosRouter } from './routes/file.upload.images.routes';
import { FilesUploadCsvRouter } from './routes/file.upload.csv.routes';
import { MailTransactionRoute } from './routes/transactional.mail.routes';
import './crons/backupDB'


class App {

    private logger = require('morgan');
    public app: express.Application;
    public server: http.Server;

    public routeUsuarios: UsuariosRouter = new UsuariosRouter();
    public routeLogin: LoginRoutes = new LoginRoutes();
    public routeMarcas: MarcasRouter = new MarcasRouter();
    public routeGastos: GastosRouter = new GastosRouter();
    public routePagos: PagosRouter = new PagosRouter();
    public routeTalles: TallesRouter = new TallesRouter();
    public routeArticulos: ProductosRouter = new ProductosRouter();
    public routeCategorias: CategoriasRouter = new CategoriasRouter();
    public routeImagenes: ImagenesRouter = new ImagenesRouter();
    public routeProveedores: ProveedoresRouter = new ProveedoresRouter();
    public routeClientes: ClientesRouter = new ClientesRouter();
    public routeEstadisticas: EstadisticasRouter = new EstadisticasRouter();
    public routeMovimientos: MovimientosRouter = new MovimientosRouter();
    public routeMailTransaction: MailTransactionRoute = new MailTransactionRoute();
    public routeFUProductos: FilesUploadProductosRouter = new FilesUploadProductosRouter();
    public routeFUCsv: FilesUploadCsvRouter = new FilesUploadCsvRouter();

    constructor() {
        this.init()
    }

    async init() {
        console.log('---------\nLoading Server...');
        await config.connectDatabases();        
        this.app = express();
        this.configApp();

        this.routeUsuarios.routes(this.app);
        this.routeLogin.routes(this.app);
        this.routeMarcas.routes(this.app);
        this.routeGastos.routes(this.app);
        this.routePagos.routes(this.app);
        this.routeTalles.routes(this.app);
        this.routeArticulos.routes(this.app);
        this.routeCategorias.routes(this.app);
        this.routeImagenes.routes(this.app);
        this.routeProveedores.routes(this.app);
        this.routeClientes.routes(this.app);
        this.routeEstadisticas.routes(this.app);
        this.routeMovimientos.routes(this.app);
        this.routeFUCsv.routes(this.app);
        this.routeFUProductos.routes(this.app);
        this.routeMailTransaction.routes(this.app);
    }

    private configApp(): void {
        this.app.use(this.logger('dev'));
        this.app.use(bodyParser.json({ type: 'application/json' }));
        this.app.use(bodyParser.urlencoded({ 'extended': false }));
        this.app.use(cors());
        this.app.use('/static', express.static(__dirname + '/public'));
        this.app.use(compression());
        this.app.use(helmet());

        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
            next();
        });

        this.app.listen(config.port, () =>
            console.log(`---------\nApp listening on port: ${config.port}`));

    }

}
export default new App().app;