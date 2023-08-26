/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { createValidator } from 'express-joi-validation';

import controllers from './my-library.controllers';
import schemas from './my-library.schemas';

const router: Router = Router();
const validator = createValidator({});

router.get('/', controllers.get);

router.post('/add', validator.body(schemas.addMovie), controllers.addMovie);

export default router;
