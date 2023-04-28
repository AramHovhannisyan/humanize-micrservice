import express, { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import logger from 'morgan';
import cors from 'cors';
import { config } from "./config/config";
import { Err } from "./types/ErrorTypes";
import problem from './errorHandling/problem';
import { dataRouter } from './routes/dataRouter';
import { bootstrapConsumer } from './consumer';
import authMiddleware from './middlewares/authMiddleware';

const app = express();

// Middlewares

// Implement CORS

app.use(cors({
  "origin": "*",
  "methods": "GET,POST",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));

if(config.server.env === 'dev'){
  app.use(logger('dev'));
}

// Body Parser, reading data from body into req.body
app.use(express.json({limit: '10kb'}));
app.use(express.urlencoded({extended: true, limit: '10kb'}));

app.use(compression());

/**
 * Routes
 * Mounting Routes
 */
app.get('/health', (req, res) => res.sendStatus(200));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

app.use('/api/v1/data', authMiddleware, dataRouter);

app.use((req, res, next) => next(problem(1002, req)));

app.use((err: Err, req: Request, res: Response, next: NextFunction) => {
  const { status, body } = err;
  res.setHeader('Content-Type', 'application/problem+json');
  res.status(status || 500);
  res.json(body);
});

const port = config.server.port || 80;

app.listen(port, async () => {
  console.info(`listening on port ${port}`);
  await bootstrapConsumer();
});