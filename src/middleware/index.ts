import * as Sentry from '@sentry/node'; // Import Sentry module

// Import necessary modules and classes
import express, { NextFunction, Request, Response } from "express"; // import express and its NextFunction, Request, and Response types
import { get, identity, merge } from "lodash"; // import 'get', 'identity', and 'merge' utility functions from the lodash library
import { getUserBySessionToken } from "../model/userModel"; // import the 'getUserBySessionToken' function from the userModel module
import { userModel } from "../model/userModel"; // import the 'userModel' object from the userModel module


// Define the CustomRequest interface, extending the Request interface and adding an optional identity property
interface CustomRequest extends Request {
  identity?: typeof userModel;
}

// Define the isAuthenticated middleware function
export const isAuthenticated = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get the sessionToken from the request cookies
    const sessionToken = req.cookies.sessionToken;

    // If there's no sessionToken
    if (!sessionToken) {
      // Respond with a 404 status and an "Unauthorized!" message
      res.status(404).send({ message: "Unauthorized!" });
      return;
    }

    // Get the user associated with the sessionToken
    const existingUser = await getUserBySessionToken(sessionToken);

    // if the sessionToken isn't the same with the existingUser's
    if (!existingUser) {
      // Respond with a 404 status and an "Unauthorized!" message
      res.status(404).send({ message: "Unauthorized!" });
      return;
    }

    // Merge the existingUser object into the req object, setting it as the identity property
    merge(req, { identity: existingUser });

    // Call the next middleware function in the stack
    next();
  } catch (error) {
    // Pass the error to the next middleware function in the stack
    next(error);
  }
};


// Define the isOwner middleware function
export const isOwner = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params; // get the 'id' parameter from the request

    const currentUserId = get(req, "identity._id")! as string; // get the '_id' property from the 'identity' object in the request

    if (!currentUserId) { // if there's no currentUserId
      res
        .status(404)
        .json({ message: "You are not in possession of this account!" }); // respond with a 404 status and an error message
      return;
    }

    if (currentUserId.toString() !== id) { // if the currentUserId does not match the 'id' parameter
      res
        .status(404)
        .json({ message: "You are not in possession of this account!" }); // respond with a 404 status and an error message
      return;
    }

    next(); // call the next middleware function in the stack
  } catch (error) { // if an error occurs
    next(error); // pass the error to the next middleware function in the stack
  }
};