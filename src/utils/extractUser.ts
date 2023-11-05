import { Request, Response, NextFunction } from "express"; // Import the Request, Response, and NextFunction types from the Express library [2]
import NodeCache from "node-cache"; // Import the NodeCache library for caching [1]
// Initialize node-cache with a default TTL (time-to-live) of 3 minutes (180 seconds)
const cache = new NodeCache({ stdTTL: 180 });

// Function to extract user data
// Function to extract user data
export const extractUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the unique ID from the request parameters
    const { id } = req.params;
    // Retrieve and delete the random string from the cache using the unique ID
    let randomString = cache.take(id) as string;
    // If the random string is not found in the cache, send an error message
    if (!randomString) {
      return null; // Return null if user data extraction fails
    }

    // Decode the base64-encoded random string back to a JSON string
    const requestBody = Buffer.from(randomString, "base64").toString();
    // Parse the JSON string to an object
    const reqBody = JSON.parse(requestBody);
    // Extract the name, email, and password from the parsed object
    const { name, email, password } = reqBody;

    return { name, email, password };
  } catch (error) {
    // Pass the error to the next middleware function
    next(error);
  }
};
