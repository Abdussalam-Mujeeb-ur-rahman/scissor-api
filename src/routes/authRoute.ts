import { Router } from 'express'; // import the Router class from the express module

import { generateLink, CreateUser, login } from '../controller/authController'; // import the auth controller
import { validateRequestBodyToGenerateLink } from '../middleware/validation/validateRequestBodyToGenerateLink';
import {validateLoginRequests} from '../middleware/validation/loginRequest';

const router = Router(); // Create an instance of the Router

router.post('/', validateRequestBodyToGenerateLink, generateLink); // handle POST requests to '/' by calling the generateLink function from the authController

router.get('/:id', CreateUser); // handle GET requests to '/:id' by calling the extractAndCreateUser function from the authController

router.post('/login', validateLoginRequests, login); // handle POST requests to '/login' by calling the login function from the authController

export default router; // export the router instance as the default export of this module
