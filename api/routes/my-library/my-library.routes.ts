/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { createValidator } from 'express-joi-validation';

import controllers from './my-library.controllers';
import schemas from './my-library.schemas';

const router: Router = Router();
const validator = createValidator({});

router.get('/', controllers.get);

router.get('/search/:name', validator.params(schemas.searchParams), controllers.search);

router.post('/movie/:moviedb_id', validator.params(schemas.userMovieParams), controllers.addMovie);

router.patch('/movie/:moviedb_id', validator.params(schemas.userMovieParams), validator.body(schemas.rateBody), controllers.rateMovie);

router.delete('/movie/:moviedb_id', validator.params(schemas.userMovieParams), controllers.removeMovie);

export default router;
