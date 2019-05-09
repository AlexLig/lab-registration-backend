import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.use(express.json());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // todo: log ex
  console.log(err.message, err);
  res.status(500).send('Something went wrong');
});

app.get('/', (request, response) => {
  response.send('<h1>HELLO WORLD</h1>');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to PORT:${port}`));
