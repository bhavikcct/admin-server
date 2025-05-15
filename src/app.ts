import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import projectroutes from './routes/project.routes';
import estimationRoutes from './routes/estimation.route';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectroutes);
app.use('/api/estimation', estimationRoutes);


export default app;
