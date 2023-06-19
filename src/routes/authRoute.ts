import { Router } from 'express';

import { generateLink, extractAndCreateUser, login } from '../controller/authController'; // import the auth controller

const router = Router(); // Create an instance of the Router

router.post('/generate-link', generateLink);

router.get('/:id', extractAndCreateUser)

router.post('/login', login);

export default router;
