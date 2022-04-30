import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import runCodeRoute from './routes/index.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', runCodeRoute);

export default app;
