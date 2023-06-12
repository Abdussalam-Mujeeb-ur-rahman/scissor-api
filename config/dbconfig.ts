// Import necessary modules
import dotenv from 'dotenv'; // import dotenv module for handling environment variables
dotenv.config(); // load environment variables from the .env file

// Define a class called Database
export class Database{
    public MONGODB_URI: string; // declare a public property MONGODB_URI of type string

    // Define the constructor for the Database class
    constructor(){
        this.MONGODB_URI = process.env.MONGODB_URI!; // assign the value of the MONGODB_URI environment variable to the MONGODB_URI property
    }
}
