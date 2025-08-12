"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules and classes
const app_1 = require("./app"); // import App class from app.ts file
const database_1 = require("./database"); // import DatabaseConnection class from database.ts file
const dbconfig_1 = require("../config/dbconfig"); // import Database class from dbconfig.ts file
const dotenv_1 = __importDefault(require("dotenv")); // import dotenv module
dotenv_1.default.config(); // load environment variables from .env file
const db = new dbconfig_1.Database(); // create a new instance of Database class
const dbConnection = new database_1.DatabaseConnection(db.MONGODB_URI); // create a new instance of DatabaseConnection class with MONGODB_URI as parameter
dbConnection.connect(); // connect to database
// Create a new instance of App class and start the server
const app = new app_1.App(); // create a new instance of App class
app.start(); // start the server
//# sourceMappingURL=index.js.map