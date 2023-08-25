/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { createValidator } from 'express-joi-validation';

import controllers from './movie.controllers';
import schemas from './movie.schemas';

const router: Router = Router();
const validator = createValidator({});

router.get('/', controllers.get);

router.get('/search', validator.query(schemas.search), controllers.search);

router.get('/details/:id', controllers.movie);

export default router;
