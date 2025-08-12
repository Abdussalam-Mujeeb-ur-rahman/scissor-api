"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
// Import necessary modules
const dotenv_1 = __importDefault(require("dotenv")); // import dotenv module for handling environment variables
dotenv_1.default.config(); // load environment variables from the .env file
// Define a class called Database
class Database {
    // Define the constructor for the Database class
    constructor() {
        this.MONGODB_URI = process.env.MONGODB_URI; // assign the value of the MONGODB_URI environment variable to the MONGODB_URI property
    }
}
exports.Database = Database;
//# sourceMappingURL=dbconfig.js.map