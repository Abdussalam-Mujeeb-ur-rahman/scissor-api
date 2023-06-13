// Import necessary modules and classes
import express, {Application, Request, Response, NextFunction} from 'express'; // import express module and related types
import bodyParser from 'body-parser'; // import body-parser module for parsing HTTP request bodies
import cookieParser from 'cookie-parser'; // import cookie-parser module for parsing cookies
import cors from 'cors'; // import cors module for handling Cross-Origin Resource Sharing
import morgan from 'morgan'; // import morgan module for logging HTTP requests

// import routes
import authRouter from './routes/authRoute';
import shortenRouter from './routes/shortenRoute'; // import shortenRouter for handling URL shortening routes

export class App {
    private app: Application; // declare a private property app of type Application

    constructor() {
        this.app = express(); // initialize app as an express application
        this.config(); // call config method to configure middleware
        this.routes(); // call routes method to set up routes
        this.errorHandler(); // call errorHandler method to handle errors
    }

    private config(): void {
        this.app.use(morgan('dev')); // use morgan middleware for logging HTTP requests in development mode
        this.app.use(bodyParser.json()); // use body-parser middleware for parsing JSON request bodies
        this.app.use(bodyParser.urlencoded({extended: true})); // use body-parser middleware for parsing URL-encoded request bodies
        this.app.use(cookieParser()); // use cookie-parser middleware for parsing cookies
        this.app.use(cors({ // use cors middleware for handling CORS
            origin: '*', // allow all origins
            credentials: true // allow credentials
        }));
    }

    private routes(): void {
        this.app.get('/', (req: Request, res: Response) => { // define a GET route for the root path
            res.send('Hello, welcome to my scissor API.'); // send a welcome message as a response
        });

        this.app.use('/auth', authRouter); // use auth middleware to sign and log users in.

        this.app.use('/', shortenRouter); // use shortenRouter middleware for handling URL shortening routes

        this.app.get('*' || '/*/*', (req: Request, res: Response) => { // define a catch-all GET route for non-existing paths
            res.status(404).send('Not Found'); // send a 404 Not Found response
        });
    }

    private errorHandler(): void {
        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => { // define error handling middleware
            res.status(500); // set response status to 500 Internal Server Error
            console.log(err); // log the error to the console
            res.end(err.message); // send the error message as a response and end the response
        });
    }

    public start(): void {
        this.app.listen(5050, () => console.log('Server started at http://localhost:5050')); // start the server on port 5050 and log the server URL
    }
};
