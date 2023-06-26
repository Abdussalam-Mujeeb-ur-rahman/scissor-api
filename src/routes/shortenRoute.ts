import { Router } from 'express'; // import the Router class from the express module

import { createNewUrl, getURL } from '../controller/shortenController'; // import createNewUrl and getURL functions from shortenController
import { isAuthenticated } from '../middleware'; // import the isAuthenticated middleware

const router = Router(); // create a new instance of Router to handle routes

router.post('/new',isAuthenticated, createNewUrl); // define a POST route for '/new' path and use createNewUrl function as the route handler
router.get('/:short_id', getURL); // define a GET route for '/:short_id' path and use getURL function as the route handler

export default router; // export the router instance for use in other modules
