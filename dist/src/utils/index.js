"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = exports.random = void 0;
const crypto_1 = __importDefault(require("crypto")); // import the crypto module for generating random bytes and creating cryptographic hash functions
const env_var_1 = require("../../config/env_var"); // import the Env_vars class from the config folder to access environment variables
const env_vars = new env_var_1.Env_vars; // create a new instance of the Env_vars class to access its properties and methods
// Define a function 'random' that generates a random base64 string of length 128 bytes
const random = () => crypto_1.default.randomBytes(128).toString('base64');
exports.random = random;
// Define a function 'Authentication' that takes a salt and a password as arguments
const Authentication = (salt, password) => {
    // Create a HMAC hash function with the 'sha256' algorithm, using the salt and password as the key, and the SECRET environment variable as the data
    return crypto_1.default.createHmac('sha256', [salt, password].join('/')).update(env_vars.SECRET).digest('hex');
};
exports.Authentication = Authentication;
//# sourceMappingURL=index.js.map