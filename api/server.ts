import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import mongoose from 'mongoose';

// API routes
import movie from './routes/movie/movie.routes';
import myLibrary from './routes/my-library/my-library.routes';

dotenv.config();

const app: Express = express();
const port: string | undefined = process.env.PORT;

// allow CORS from any origins
// only for localhost development use
if (process.env.ENV === 'localhost') {
    app.use(cors({
        origin: '*'
    }));
}

app.get('/', (req: Request, res: Response) => {
    res.send('Movie Library API');
});

app.use(bodyParser.json());

app.use('/movie', movie);
app.use('/my-library', myLibrary);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('error :>> ', error);
    if (error) {
        res.status(400).send(error.message);
    }
});

app.get('/*', (req: Request, res: Response) => {
    res.status(404).send('Route not found');
});

console.error('[mongodb] waiting connection ...');
mongoose
    .connect('mongodb://localhost:27017/movie-library', {
    // .connect('mongodb://host.docker.internal:27017/movie-library', {
        auth: {
            username: process.env.MONGODB_USERNAME,
            password: process.env.MONGODB_PASSWORD
        },
        authSource: 'admin'
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    .then(() => {
        console.log('⚡️[mongodb] connected and secured');
        app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('[mongodb] failed to connect');
        console.error(err);
    });
