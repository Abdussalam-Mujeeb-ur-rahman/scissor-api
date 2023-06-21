// Import necessary modules
import mongoose from "mongoose"; // import the mongoose library for handling MongoDB connections

// Define the DatabaseConnection class
export class DatabaseConnection {
  private mongodb_uri: string; // declare a private variable to store the MongoDB URI

  constructor(mongodb_uri: string) { // define the constructor, taking a MongoDB URI as an argument
    this.mongodb_uri = mongodb_uri; // assign the passed MongoDB URI to the private variable
  }

  public connect(): void { // define a public method named 'connect' with no return value
    mongoose.connect(this.mongodb_uri); // connect to the MongoDB database using the stored URI

    // Set up event listeners for the mongoose connection
    mongoose.connection.on("connected", () => { // when the connection is successfully established
      console.log("Database connected"); // log a message indicating that the database is connected
    });

    mongoose.connection.on("error", (err: any) => { // when there is an error in the connection
      console.log("Database error: " + err); // log a message indicating the error and the error details
    });

    mongoose.connection.on("disconnected", () => { // when the connection is disconnected
      console.log("Database disconnected"); // log a message indicating that the database is disconnected
    });
  }
}
