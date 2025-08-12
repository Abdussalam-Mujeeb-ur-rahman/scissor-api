"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOwner = exports.isAuthenticated = void 0;
const lodash_1 = require("lodash"); // import 'get', 'identity', and 'merge' utility functions from the lodash library
const userModel_1 = require("../model/userModel"); // import the 'getUserBySessionToken' function from the userModel module
// Define the isAuthenticated middleware function
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the sessionToken from the request cookies
        const sessionToken = req.cookies.sessionToken;
        // If there's no sessionToken
        if (!sessionToken) {
            // Respond with a 404 status and an "Unauthorized!" message
            res.status(404).send({ message: "Unauthorized!" });
            return;
        }
        // Get the user associated with the sessionToken
        const existingUser = yield (0, userModel_1.getUserBySessionToken)(sessionToken);
        // if the sessionToken isn't the same with the existingUser's
        if (!existingUser) {
            // Respond with a 404 status and an "Unauthorized!" message
            res.status(404).send({ message: "Unauthorized!" });
            return;
        }
        // Merge the existingUser object into the req object, setting it as the identity property
        (0, lodash_1.merge)(req, { identity: existingUser });
        // Call the next middleware function in the stack
        next();
    }
    catch (error) {
        // Pass the error to the next middleware function in the stack
        next(error);
    }
});
exports.isAuthenticated = isAuthenticated;
// Define the isOwner middleware function
const isOwner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // get the 'id' parameter from the request
        const currentUserId = (0, lodash_1.get)(req, "identity._id"); // get the '_id' property from the 'identity' object in the request
        if (!currentUserId) { // if there's no currentUserId
            res
                .status(404)
                .json({ message: "You are not in possession of this account!" }); // respond with a 404 status and an error message
            return;
        }
        if (currentUserId.toString() !== id) { // if the currentUserId does not match the 'id' parameter
            res
                .status(404)
                .json({ message: "You are not in possession of this account!" }); // respond with a 404 status and an error message
            return;
        }
        next(); // call the next middleware function in the stack
    }
    catch (error) { // if an error occurs
        next(error); // pass the error to the next middleware function in the stack
    }
});
exports.isOwner = isOwner;
//# sourceMappingURL=index.js.map