import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import routes from './routes/index.js';
import { PORT, UPLOADS_DIR } from '../env.js';
import dotenv from 'dotenv';
import listEndpoints from 'express-list-endpoints';
import { errorController, notFoundController } from './middlewares/index.js';
import { testDatabaseConnection } from './db/getPool.js'; // Asegúrate de que la ruta sea correcta

dotenv.config();

const server = express();

server.use(morgan('dev'));
server.use(express.json());
server.use(cors()); // Acepta pedidos desde cualquier IP
server.use(express.static(UPLOADS_DIR));
server.use(fileUpload());

// Middleware de registro de solicitudes
server.use((req, res, next) => {
    console.log(`${req.method} request received for ${req.url}`);
    next();
});

// Middleware de rutas
server.use('/', routes);

// Middleware de método HTTP no permitido
server.use((err, req, res, next) => {
    if (req.method === 'POST' && req.url === '/users/logout/' && err.status === 404) {
        return res.status(405).json({
            message: 'Method not allowed',
            status: 405,
            data: null
        });
    }
    next();
});

// Middleware de ruta no encontrada
server.use(notFoundController);

// Middleware de manejo de errores
server.use(errorController);

// Función para iniciar el servidor
const startServer = async () => {
    try {
        // Verificar conexión a la base de datos antes de iniciar el servidor
        await testDatabaseConnection();
        console.log('Conexión a la base de datos verificada con éxito');

        // Iniciar el servidor para escuchar en el puerto especificado
        server.listen(PORT, () => {
            console.log(`Servidor escuchando en http://192.168.1.158:${PORT}`);
            const serverEndpoints = listEndpoints(server);
            console.log('Rutas de la API:');
            serverEndpoints.forEach(route => console.log(route.path));
        });
    } catch (error) {
        console.error('No se pudo establecer conexión con la base de datos:', error);
        process.exit(1); // Finaliza el proceso si no se puede conectar a la base de datos
    }
};

// Llama a la función para iniciar el servidor
startServer();
