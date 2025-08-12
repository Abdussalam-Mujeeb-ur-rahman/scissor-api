"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env_vars = void 0;
// Import the dotenv package for handling environment variables
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from the .env file
dotenv_1.default.config();
// Define a class called Env_vars for handling environment variables
class Env_vars {
    // Constructor for the Env_vars class
    constructor() {
        // Assign the SECRET environment variable to the SECRET property
        this.SECRET = process.env.SECRET;
        // Assign the GMAIL environment variable to the gmail property
        this.gmail = process.env.GMAIL;
        // Assign the GMAIL_PASS environment variable to the gmailPass property
        this.gmailPass = process.env.GMAIL_PASS;
        // Assign the SEC_KEY environment variable to the SEC_KEY property
        this.SEC_KEY = process.env.SEC_KEY;
        this.DSN = process.env.DSN;
        this.TREBLLE_API_KEY = process.env.TREBLLE_API_KEY;
        this.TREBLLE_PROJECT_ID = process.env.TREBLLE_PROJECT_ID;
        this.NODE_ENV = process.env.NODE_ENV;
    }
}
exports.Env_vars = Env_vars;
//# sourceMappingURL=env_var.js.map