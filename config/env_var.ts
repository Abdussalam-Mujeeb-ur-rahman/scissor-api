// Import the dotenv package for handling environment variables
import dotenv from "dotenv";
// Load environment variables from the .env file
dotenv.config();

// Define a class called Env_vars for handling environment variables
export class Env_vars {
  public SECRET: string;
  public gmail: string;
  public gmailPass: string;
  public SEC_KEY: string;
  public DSN: string;
  public TREBLLE_API_KEY: string;
  public TREBLLE_PROJECT_ID: string;
  public NODE_ENV: string;

  // Constructor for the Env_vars class
  constructor() {
    // Assign the SECRET environment variable to the SECRET property
    this.SECRET = process.env.SECRET!;
    // Assign the GMAIL environment variable to the gmail property
    this.gmail = process.env.GMAIL!;
    // Assign the GMAIL_PASS environment variable to the gmailPass property
    this.gmailPass = process.env.GMAIL_PASS!;
    // Assign the SEC_KEY environment variable to the SEC_KEY property
    this.SEC_KEY = process.env.SEC_KEY!;
    this.DSN = process.env.DSN!;
    this.TREBLLE_API_KEY = process.env.TREBLLE_API_KEY!;
    this.TREBLLE_PROJECT_ID = process.env.TREBLLE_PROJECT_ID!;
    this.NODE_ENV = process.env.NODE_ENV!;
  }
}
