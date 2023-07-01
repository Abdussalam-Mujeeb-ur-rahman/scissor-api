// Import the dotenv package for handling environment variables
import dotenv from 'dotenv';
// Load environment variables from the .env file
dotenv.config();

// Define a class called Env_vars for handling environment variables
export class Env_vars {
  public SECRET: string;
  public gmail: string;
  // public gmailPass: string;
  public SEC_KEY: string;
  public DSN: string;

  // Constructor for the Env_vars class
  constructor() {
    // Assign the SECRET environment variable to the SECRET property
    this.SECRET = process.env.SECRET!;
    // Assign the GMAIL environment variable to the gmail property
    this.gmail = process.env.GMAIL!;
    // Assign the SEC_KEY environment variable to the SEC_KEY property
    this.SEC_KEY = process.env.SEC_KEY!;
    this.DSN = process.env.DSN!;
  }
}
