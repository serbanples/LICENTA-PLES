import express, { Express } from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes'
import errorHandler from './middlewares/errorHandler';

const app: Express = express();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions))
app.use(express.json());

app.use('/api', userRoutes);

app.use(errorHandler);

export default app;