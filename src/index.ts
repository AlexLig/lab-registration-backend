import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

// Connect to db
mongoose
  .connect('mongodb://localhost/labRegistration', {
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected to mongoDB...'))
  .catch(() => console.log('Failed to connect'));

const app = express();

// Middlewares
app.use(express.json());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // todo: log ex
  console.log(err.message, err);
  res.status(500).send('Something went wrong');
});

// Home route
app.get('/', (request, response) => {
  response.send('<h1>HELLO WORLD</h1>');
});

// Start up server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to PORT:${port}`));
