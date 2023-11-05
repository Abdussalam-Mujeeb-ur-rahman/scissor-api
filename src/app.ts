// Import necessary modules and classes
import express, { Application, Request, Response, NextFunction } from 'express'; // Import Express module and related types
import bodyParser from 'body-parser'; // Import body-parser module for parsing HTTP request bodies
import cookieParser from 'cookie-parser'; // Import cookie-parser module for parsing cookies
import cors from 'cors'; // Import cors module for handling Cross-Origin Resource Sharing
import morgan from 'morgan'; // Import morgan module for logging HTTP requests
import rateLimit from 'express-rate-limit'; // Import rate-limit module for rate limiting
import helmet from 'helmet'; // Import Helmet module for security
import * as Sentry from '@sentry/node'; // Import Sentry module
import trebble from '@treblle/express'; // Import treblle module

import {initializeSentry} from './utils/sentry';

// Import routes
import authRouter from './routes/authRoute'; // Import authRouter for handling authentication
import shortenRouter from './routes/shortenRoute'; // Import shortenRouter for handling URL shortening routes
import userRouter from './routes/userRoutes'; // Import user router for handling operation involving getting, updating and deleting users from the database

import {Env_vars} from '../config/env_var';
const env_vars = new Env_vars();
const {TREBLLE_API_KEY, TREBLLE_PROJECT_ID} = env_vars

// Create the rate limit rule
const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // Set time window to 1 minute
  max: 30, // Limit each IP to 30 requests per time window
});

// Define the App class
export class App {
  private app: Application; // Declare a private property app of type Application

  // Define the constructor for the App class
  constructor() {
    this.app = express(); // Initialize app as an express application
    initializeSentry(this.app); // Initialize Sentry here
    this.config(); // Call config method to configure middleware
    this.routes(); // Call routes method to set up routes
    this.errorHandler(); // Call errorHandler method to handle errors
  }

  // Define the config method for setting up middleware
  private config(): void {
    this.app.use(trebble({
      apiKey: TREBLLE_API_KEY,
      projectId: TREBLLE_PROJECT_ID,
      additionalFieldsToMask: []
    })); // Add trebble middleware
    this.app.use(Sentry.Handlers.requestHandler()); // Add Sentry request handler
    this.app.use(cookieParser()); // Use cookie-parser middleware for parsing cookies
    this.app.use(morgan('dev')); // Use morgan middleware for logging HTTP requests in development mode
    this.app.use(bodyParser.json()); // Use body-parser middleware for parsing JSON request bodies
    this.app.use(bodyParser.urlencoded({ extended: true })); // Use body-parser middleware for parsing URL-encoded request bodies
    this.app.use(helmet()); // Use Helmet middleware for security
    this.app.use(
      cors({
        origin: '*', // Allow all origins
        credentials: true, // Allow credentials (cookies)
      })
    );
    this.app.use(apiRequestLimiter); // Use apiRequestLimiter middleware for handling number of requests.
  }

  // Define the routes method for setting up routes
  private routes(): void {
    // Define a GET route for the root path
    this.app.get('/', (req: Request, res: Response) => {
      // Send a welcome message as a response
      res.json({message: 'Hello, welcome to my scissor API.'});
      return;
    });

    // Use auth middleware to sign and log users in
    this.app.use('/auth', authRouter);

    this.app.use('/user', userRouter);

    // Use shortenRouter middleware for handling URL shortening routes
    this.app.use('/', shortenRouter);

    // Define a catch-all GET route for non-existing paths
    this.app.get('*' || '/*/*', (req: Request, res: Response) => {
      // Send a 404 Not Found response
      res.status(404).send('Not Found');
    });
  }

  // Define the errorHandler method for handling errors
  private errorHandler(): void {
    this.app.use(Sentry.Handlers.errorHandler()); // Add Sentry error handler
    // Define error handling middleware
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
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
  public start(): void {
    // Start the server on port 5050 and log the server URL
    this.app.listen(5050, () => console.log('Server started at http://localhost:5050'));
  }
};
