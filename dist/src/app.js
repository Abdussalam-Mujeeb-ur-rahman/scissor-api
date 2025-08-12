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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
// Import necessary modules and classes
const express_1 = __importDefault(require("express")); // Import Express module and related types
const body_parser_1 = __importDefault(require("body-parser")); // Import body-parser module for parsing HTTP request bodies
const cookie_parser_1 = __importDefault(require("cookie-parser")); // Import cookie-parser module for parsing cookies
const cors_1 = __importDefault(require("cors")); // Import cors module for handling Cross-Origin Resource Sharing
const morgan_1 = __importDefault(require("morgan")); // Import morgan module for logging HTTP requests
const express_rate_limit_1 = __importDefault(require("express-rate-limit")); // Import rate-limit module for rate limiting
const helmet_1 = __importDefault(require("helmet")); // Import Helmet module for security
const Sentry = __importStar(require("@sentry/node")); // Import Sentry module
const express_2 = __importDefault(require("@treblle/express")); // Import treblle module
const sentry_1 = require("./utils/sentry");
// Import routes
const authRoute_1 = __importDefault(require("./routes/authRoute")); // Import authRouter for handling authentication
const shortenRoute_1 = __importDefault(require("./routes/shortenRoute")); // Import shortenRouter for handling URL shortening routes
const userRoutes_1 = __importDefault(require("./routes/userRoutes")); // Import user router for handling operation involving getting, updating and deleting users from the database
const env_var_1 = require("../config/env_var");
const env_vars = new env_var_1.Env_vars();
const { TREBLLE_API_KEY, TREBLLE_PROJECT_ID } = env_vars;
// Create the rate limit rule
const apiRequestLimiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000,
    max: 30, // Limit each IP to 30 requests per time window
});
// Define the App class
class App {
    // Define the constructor for the App class
    constructor() {
        this.app = (0, express_1.default)(); // Initialize app as an express application
        (0, sentry_1.initializeSentry)(this.app); // Initialize Sentry here
        this.config(); // Call config method to configure middleware
        this.routes(); // Call routes method to set up routes
        this.errorHandler(); // Call errorHandler method to handle errors
    }
    // Define the config method for setting up middleware
    config() {
        this.app.use((0, express_2.default)({
            apiKey: TREBLLE_API_KEY,
            projectId: TREBLLE_PROJECT_ID,
            additionalFieldsToMask: [],
        })); // Add trebble middleware
        this.app.use(Sentry.Handlers.requestHandler()); // Add Sentry request handler
        this.app.use((0, cookie_parser_1.default)(env_vars.SECRET)); // Use cookie-parser middleware for parsing cookies with secret
        this.app.use((0, morgan_1.default)("dev")); // Use morgan middleware for logging HTTP requests in development mode
        this.app.use(body_parser_1.default.json()); // Use body-parser middleware for parsing JSON request bodies
        this.app.use(body_parser_1.default.urlencoded({ extended: true })); // Use body-parser middleware for parsing URL-encoded request bodies
        this.app.use((0, helmet_1.default)()); // Use Helmet middleware for security
        this.app.use((0, cors_1.default)({
            origin: "*",
            credentials: true, // Allow credentials (cookies)
        }));
        this.app.use(apiRequestLimiter); // Use apiRequestLimiter middleware for handling number of requests.
    }
    // Define the routes method for setting up routes
    routes() {
        // Define a GET route for the root path
        this.app.get("/", (req, res) => {
            // Send a welcome message as a response
            res.json({ message: "Hello, welcome to my scissor API." });
            return;
        });
        // Use auth middleware to sign and log users in
        this.app.use("/auth", authRoute_1.default);
        this.app.use("/user", userRoutes_1.default);
        // Use shortenRouter middleware for handling URL shortening routes
        this.app.use("/", shortenRoute_1.default);
        // Define a catch-all GET route for non-existing paths
        this.app.get("*" || "/*/*", (req, res) => {
            // Send a 404 Not Found response
            res.status(404).send("Not Found");
        });
    }
    // Define the errorHandler method for handling errors
    errorHandler() {
        this.app.use(Sentry.Handlers.errorHandler()); // Add Sentry error handler
        // Define error handling middleware
        this.app.use((err, req, res, next) => {
            // Set response status to 500 Internal Server Error
            res.status(500);
            // Log the error to the console
            console.log(err);
            // Send the error message as a response and end the response
            Sentry.captureException(err);
            next();
        });
    }
    // Define the start method for starting the server
    start() {
        // Start the server on port 3000 and log the server URL
        this.app.listen(3000, () => console.log("Server started at http://localhost:3000"));
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map