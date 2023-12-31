require('dotenv').config();
import express, { NextFunction, Request, Response, response } from 'express';
import config from 'config';
import morgan from 'morgan';
import db from './config/db.config';
import validateEnv from './utils/validateEnv';
import AppError from './utils/app.error';

import createError from 'http-errors';
import cookieParser from 'cookie-parser';

import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json';

import testRouter from "./routes/test.route";

db.sync().then(() => {
    console.log('Database connected');
  }).catch(err => {
    console.log(err)
  });

const app = express();

  app.use(express.json({limit: '10kb' }));
  app.use(cookieParser());

  // app.use((req: Request, res: Response, next) => {
  //   res.setHeader('Access-Control-Allow-Origin', '*');
  //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  //   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  //   next();
  // });
 
  app.use(cors({
      credentials: true,
  }));
  
  if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
  
  app.use(express.urlencoded({ extended: false }));

  // app.get('/', (req, res) => {
  //   res.send('Hello World! Novel-AG');
  // });

  // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

  // app.get('/api/healthchecker', (_, res: Response) => {
  //   res.status(200).json({
  //     status: 'success',
  //     message: 'Welcome to NodeJs with Prisma and PostgreSQL',
  //   });
  // });

  // app.use('/api/test', testRouter);
//   app.use('/api/v1/auth', authRouter);
//   app.use('/api/v1/user', userRouter);

  app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  });

  app.use(function (req: Request, res: Response, next) {
    next(createError(404));
  });

  app.use(function (
    err: { message: string; status: number },
    req: Request,
    res: Response
  ) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
  });

const PORT = process.env.PORT;
console.clear()
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
  });
