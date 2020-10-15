import express from 'express';
import 'express-async-errors';
import path from 'path';
import './database/connection';
import cors from 'cors';

import routes from './routes';
import errorHandler from './errors/handler'

const app = express();
const port = 3333;

app.use(cors())
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler);

console.log(`server running on port ${port}...`);

app.listen(3333);

export default app;