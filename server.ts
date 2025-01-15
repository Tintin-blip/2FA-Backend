import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import userRouter from './routers/userRouters'

// Configura dotenv
config();

// Opciones de CORS
const corsOptions = {
    origin: true, 
    credentials: true,
};

export class Server {
    private app: express.Application;
    private port: string | number;
    private path: { [key: string]: string };
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.path = {
            api: "/api",
        };
        
        this.middleware();
        this.routes();
        
    }
   
    private middleware() {
        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.app.use(cors(corsOptions));
        this.app.use(cookieParser());
    }

    
    private routes() { 
        this.app.use(`${this.path.api}`,userRouter);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port:', this.port);
        });
    }
}
