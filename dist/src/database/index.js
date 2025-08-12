"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnection = void 0;
// Import necessary modules
const mongoose_1 = __importDefault(require("mongoose")); // import the mongoose library for handling MongoDB connections
// Define the DatabaseConnection class
class DatabaseConnection {
    constructor(mongodb_uri) {
        this.mongodb_uri = mongodb_uri; // assign the passed MongoDB URI to the private variable
    }
    connect() {
        mongoose_1.default.connect(this.mongodb_uri); // connect to the MongoDB database using the stored URI
        // Set up event listeners for the mongoose connection
        mongoose_1.default.connection.on("connected", () => {
            console.log("Database connected"); // log a message indicating that the database is connected
        });
        mongoose_1.default.connection.on("error", (err) => {
            console.log("Database error: " + err); // log a message indicating the error and the error details
        });
        mongoose_1.default.connection.on("disconnected", () => {
            console.log("Database disconnected"); // log a message indicating that the database is disconnected
        });
    }
}
exports.DatabaseConnection = DatabaseConnection;
//# sourceMappingURL=index.js.map