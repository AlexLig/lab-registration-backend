import express, { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import errorHandler from './middlewares/errorHandler';
import { labClassRouter } from './lab-class/router';
import { registerRouter } from './routers/register';
import { courseRouter } from './course/router';

// Connect to db
const newConnection = async () => {
  try {
    const connection: Connection = await createConnection();
    return connection;
  } catch (error) {
    console.log(error);
  }
};
newConnection();

const app = express();

// Middlewares
app.use(express.json());
app.use('/api/register', registerRouter);
app.use('/api/courses', courseRouter);
app.use('/api/labClasses', labClassRouter);
app.use(errorHandler);

// Home route
app.get('/', (request, response) => {
  response.send('<h1>HELLO WORLD</h1>');
});

// Start up server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to PORT:${port}`));
