import { Router } from 'express';

import { signup, login } from '../controller/authController'; // import the auth controller

const router = Router(); // Create an instance of the Router

router.post('/signup', signup);

router.post('/login', login);

export default router;
