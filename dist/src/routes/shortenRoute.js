"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // import the Router class from the express module
const shortenController_1 = require("../controller/shortenController"); // import createNewUrl and getURL functions from shortenController
const middleware_1 = require("../middleware"); // import the isAuthenticated middleware
const validateUrl_1 = require("../middleware/validation/validateUrl");
const router = (0, express_1.Router)(); // create a new instance of Router to handle routes
router.post('/new', middleware_1.isAuthenticated, validateUrl_1.validateUrlBody, shortenController_1.createNewUrl); // define a POST route for '/new' path and use createNewUrl function as the route handler
router.get('/:short_id', shortenController_1.getURL); // define a GET route for '/:short_id' path and use getURL function as the route handler
exports.default = router; // export the router instance for use in other modules
//# sourceMappingURL=shortenRoute.js.map