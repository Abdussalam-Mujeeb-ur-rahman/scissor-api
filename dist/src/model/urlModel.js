"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUrlsByUserId = exports.URL_Model = void 0;
// Import necessary modules and classes
const mongoose_1 = __importDefault(require("mongoose")); // import mongoose and Document type from mongoose module
// Create a new mongoose schema for URL documents
const URL_Schema = new mongoose_1.default.Schema({
    original_url: {
        type: String,
        required: true, // make original_url a required field
    },
    short_id: {
        type: String,
        required: true, // make short_id a required field
    },
    user_id: {
        type: String,
        required: true,
        ref: "User", // reference to the User model
    },
});
// Create a mongoose model for shortenedURL using the URL_Schema
exports.URL_Model = mongoose_1.default.model("urls", URL_Schema);
// Define methods on the URL model
const deleteUrlsByUserId = (userId) => exports.URL_Model.deleteMany({ user_id: userId }); // define a method to delete all URLs by user ID
exports.deleteUrlsByUserId = deleteUrlsByUserId;
//# sourceMappingURL=urlModel.js.map