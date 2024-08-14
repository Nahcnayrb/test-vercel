import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { connectToDatabase } from "./services/database.service";
import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';

require('dotenv').config();

const app = express();


connectToDatabase()
  .then(() => {
    app.use(morgan('dev'));
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  })

export default app;
