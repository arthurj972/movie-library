/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { createValidator } from 'express-joi-validation';

import controllers from './my-library.controllers';
import schemas from './my-library.schemas';

const router: Router = Router();
const validator = createValidator({});

router.get('/', controllers.get);

router.post('/', validator.body(schemas.addOrRemoveMovieBody), controllers.addMovie);

router.patch('/', validator.body(schemas.rateBody), controllers.rateMovie);

router.delete('/', validator.body(schemas.addOrRemoveMovieBody), controllers.removeMovie);

export default router;
