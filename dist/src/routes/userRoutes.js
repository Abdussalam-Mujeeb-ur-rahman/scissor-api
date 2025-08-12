"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
router.delete('/deleteUser/:id', middleware_1.isAuthenticated, middleware_1.isOwner, userController_1.deleteUser);
router.patch('/updateUser/:id', middleware_1.isAuthenticated, middleware_1.isOwner, userController_1.updateUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map