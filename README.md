# Movie Library

Movie Library with React NodeJS MongoDB on dockerizing application.

## Applications

- `/api` for ExpressJS API.
- `/app` for React application.

## TODO

You need to pass your [The Movie DB](https://www.themoviedb.org/settings/api) token on `/api/.env`:`MOVIEDB_TOKEN` file.\
It's the **token**, not *api key*.

## Docker Compose

Deploy this stack with `docker-compose` ! It contains:

- MongoDB run by default on `:27017`.
- API run by default on `:4000`.
- Frontend application run by default on `:3000`.

You can change default ports on `docker-compose.yml`.

## Available Scripts

In this root directory, you can run:

### `docker-compose up -d`

Runs the entire stack on the production mode./
Please wait few minutes.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.