import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import usersRouter from './routes/usersRoutes';
import postRouter from './routes/postsRoutes';
import globalErrorHandler from './controllers/errorController';
import { authCheck } from './controllers/authController';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', usersRouter);
app.use('/api/posts', postRouter);

app.use(globalErrorHandler);

export default app;
