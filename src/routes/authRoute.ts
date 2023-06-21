import { Router } from 'express'; // import the Router class from the express module

import { generateLink, extractAndCreateUser, login } from '../controller/authController'; // import the auth controller

const router = Router(); // Create an instance of the Router

router.post('/generate-link', generateLink); // handle POST requests to '/generate-link' by calling the generateLink function from the authController

router.get('/:id', extractAndCreateUser); // handle GET requests to '/:id' by calling the extractAndCreateUser function from the authController

router.post('/login', login); // handle POST requests to '/login' by calling the login function from the authController

export default router; // export the router instance as the default export of this module
