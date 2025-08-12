"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // import the Router class from the express module
const authController_1 = require("../controller/authController"); // import the auth controller
const validateRequestBodyToGenerateLink_1 = require("../middleware/validation/validateRequestBodyToGenerateLink");
const loginRequest_1 = require("../middleware/validation/loginRequest");
const router = (0, express_1.Router)(); // Create an instance of the Router
router.post('/', validateRequestBodyToGenerateLink_1.validateRequestBodyToGenerateLink, authController_1.generateLink); // handle POST requests to '/' by calling the generateLink function from the authController
router.get('/:id', authController_1.CreateUser); // handle GET requests to '/:id' by calling the extractAndCreateUser function from the authController
router.post('/login', loginRequest_1.validateLoginRequests, authController_1.login); // handle POST requests to '/login' by calling the login function from the authController
exports.default = router; // export the router instance as the default export of this module
//# sourceMappingURL=authRoute.js.map