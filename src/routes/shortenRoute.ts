// Import necessary modules and classes
import {Router} from 'express'; // import Router class from express module

// create router
const router = Router(); // create a new instance of Router to handle routes

// import controller.
import {createNewUrl, getURL} from '../controller/shortenController'; // import createNewUrl and getURL functions from shortenController

router.post('/new', createNewUrl); // define a POST route for '/new' path and use createNewUrl function as the route handler
router.get('/:short_id', getURL); // define a GET route for '/:short_id' path and use getURL function as the route handler

export default router; // export the router instance for use in other modules
