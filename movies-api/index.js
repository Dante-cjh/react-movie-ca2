import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './api/users';
import './db';
import defaultErrHandler from './errHandler';
import moviesRouter from './api/movies';
import actorsRouter from './api/actors';
import reviewsRouter from './api/reviews';

dotenv.config();

const app = express();
const port = process.env.PORT;

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const swaggerDocument = YAML.load(path.join(__dirname, 'WebDevCA2.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/actors', actorsRouter);
app.use('/api/reviews', reviewsRouter);
app.use(defaultErrHandler);


app.listen(port, () => {
    console.info(`Server running at ${port}`);
});