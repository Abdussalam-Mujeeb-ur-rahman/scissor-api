// Import necessary modules and classes
import {App} from './app'; // import App class from app.ts file

import {DatabaseConnection} from './database'; // import DatabaseConnection class from database.ts file

import {Database} from '../config/dbconfig'; // import Database class from dbconfig.ts file

import dotenv from 'dotenv'; // import dotenv module

dotenv.config(); // load environment variables from .env file

const db = new Database(); // create a new instance of Database class


const dbConnection = new DatabaseConnection(db.MONGODB_URI); // create a new instance of DatabaseConnection class with MONGODB_URI as parameter

dbConnection.connect(); // connect to database

// Create a new instance of App class and start the server
const app = new App(); // create a new instance of App class

app.start(); // start the server
