"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.deleteUserById = exports.createUser = exports.getUserById = exports.getUserBySessionToken = exports.getUserByEmail = exports.userModel = void 0;
// Import necessary modules and classes
const mongoose_1 = __importStar(require("mongoose")); // import mongoose and its Document and Schema types
// Define the User schema
const userSchema = new mongoose_1.Schema(// create a new mongoose schema with iUser as the generic type
{
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false, default: '' },
    },
    role: {
        type: String,
        required: true,
        enum: ["user"],
        default: "user",
    },
}, { timestamps: true } // enable timestamps for created and updated fields
);
exports.userModel = mongoose_1.default.model("User", userSchema); // create a User model using the userSchema and export it as 'userModel'
// Define methods on the User model
const getUserByEmail = (email) => exports.userModel.findOne({ email }); // define a method to get a user by email
exports.getUserByEmail = getUserByEmail;
const getUserBySessionToken = (sessionToken) => exports.userModel.findOne({
    'authentication.sessionToken': sessionToken,
}); // define a method to get a user by session token
exports.getUserBySessionToken = getUserBySessionToken;
const getUserById = (id) => exports.userModel.findById(id); // define a method to get a user by ID
exports.getUserById = getUserById;
const createUser = (values) => new exports.userModel(values).save().then((user) => user.toObject()); // define a method to create a new user
exports.createUser = createUser;
const deleteUserById = (id) => exports.userModel.findByIdAndDelete(id); // define a method to delete a user by ID
exports.deleteUserById = deleteUserById;
const updateUserById = (id, values) => exports.userModel.findByIdAndUpdate(id, values); // define a method to update a user by ID
exports.updateUserById = updateUserById;
//# sourceMappingURL=userModel.js.map