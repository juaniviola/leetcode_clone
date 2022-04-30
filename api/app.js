import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes/index.js';
import firestore from './modules/index.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

(function () {
  const database = firestore();
  app.set('firestore', database);
})();

export default app;
