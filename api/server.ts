import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { type Express, type NextFunction, type Request, type Response } from 'express';

// API routes
import movie from './routes/movie/movie.routes';

dotenv.config();

const app: Express = express();
const port: string | undefined = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('Movie Library API');
});

app.use(bodyParser.json());

app.use('/movie', movie);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('error :>> ', error);
    if (error) {
        res.status(400).send(error.message);
    }
});

app.get('/*', (req: Request, res: Response) => {
    res.status(404).send('Route not found');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
});
