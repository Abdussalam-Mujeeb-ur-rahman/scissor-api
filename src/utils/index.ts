import crypto from 'crypto'; // import the crypto module for generating random bytes and creating cryptographic hash functions
import { Env_vars } from '../../config/env_var'; // import the Env_vars class from the config folder to access environment variables

const env_vars = new Env_vars; // create a new instance of the Env_vars class to access its properties and methods

// Define a function 'random' that generates a random base64 string of length 128 bytes
export const random = () => crypto.randomBytes(128).toString('base64');

// Define a function 'Authentication' that takes a salt and a password as arguments
export const Authentication = (salt: string, password: string) => {
  // Create a HMAC hash function with the 'sha256' algorithm, using the salt and password as the key, and the SECRET environment variable as the data
  return crypto.createHmac('sha256', [salt, password].join('/')).update(env_vars.SECRET).digest('hex');
};
