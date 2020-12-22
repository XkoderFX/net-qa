import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import usersRouter from './routes/usersRoutes';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', usersRouter);

export default app;
