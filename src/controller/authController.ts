// Import necessary modules and libraries
import NodeCache from "node-cache"; // Import the NodeCache library for caching [1]
import { Request, Response, NextFunction } from "express"; // Import the Request, Response, and NextFunction types from the Express library [2]
import { createUser, getUserByEmail } from "../model/userModel"; // Import the createUser and getUserByEmail functions from the user model [3]
import { Authentication, random } from "../utils"; // Import the Authentication and random utility functions [4]
import { sendConfirmationEmail } from "../utils/sendGrid"; // Import the sendConfirmationEmail function from the sendGrid utility module [5]
import { Env_vars } from "../../config/env_var"; // import the Env_vars class from the config folder to access environment variables.
const env_vars = new Env_vars(); // create a new instance of the Env_vars class to access its properties and methods.
const { NODE_ENV } = env_vars; // extract the NODE_ENV property from the env_vars object.
import extractUser from "../utils/extractUser";

// Load environment variables
require("dotenv").config();

// Initialize node-cache with a default TTL (time-to-live) of 1 day
const cache = new NodeCache({ stdTTL: 86400 });

// to generate confirmation link.
// Define an async function called generateLink that takes Request, Response, and NextFunction as parameters
export const generateLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if all required fields are provided in the request body
  if (!req.body.name || !req.body.email || !req.body.password) {
    // Respond with a 400 status and an error message if any required field is missing
    res.status(400).send({ message: "please fill required fields" });
    return;
  }

  // Check if the email address has the "gmail.com" domain
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!emailRegex.test(req.body.email)) {
    res.status(400).send({ message: "Please use a gmail.com email address" });
    return;
  }

  try {
    // Convert the request body to a JSON string
    const requestBody = JSON.stringify(req.body);
    // Encode the JSON string as a base64-encoded string
    const randomString = Buffer.from(requestBody).toString("base64");
    // Generate a unique ID using the Math.random function
    const uniqueID = Math.random().toString(36).substring(2, 9);
    // Save the random string to the cache with the unique ID as the key
    cache.set(uniqueID, randomString);
    // Generate the confirmation link using the unique ID
    const link = `${req.protocol}://${req.get("host")}/auth/${uniqueID}`;

    console.log("link", link);

    // Send the confirmation email with the generated link
    const response = await sendConfirmationEmail(req.body.email, link);

    // In development mode, also return the confirmation link in the response
    if (NODE_ENV === "development") {
      res.json({
        response: response,
        confirmationLink: link,
        message: "Check the confirmation link in the response for testing",
      });
    } else {
      res.json({ response: response });
    }
  } catch (error) {
    // Pass the error to the next middleware function
    next(error);
  }
};

// extract and create user from link sent.
// Define an async function called CreateUser that takes Request, Response, and NextFunction as parameters
export const CreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the unique ID from the request parameters
    const { id } = req.params;

    console.log("id", id);

    const reqBody = extractUser(id, cache);

    if (!reqBody) {
      return res.status(404).send("link not found! or expired!");
    }

    // Extract the name, email, and password from the parsed object
    const { name, email, password } = reqBody;

    try {
      // Check if a user with the provided email already exists
      const existingUser = await getUserByEmail(email);

      // If the user already exists, respond with a 400 status and an error message
      if (existingUser) {
        res.status(400).send({ message: "Email already exists" });
        return;
      }

      // Generate a random salt for password hashing
      const salt = random();
      // Create a new user object with the provided data and hashed password
      const user = await createUser({
        name,
        email,
        authentication: {
          salt,
          password: Authentication(salt, password),
        },
      });

      // Send a 201 status and a success message along with the created user object
      res.status(201).json({
        message: `user created successfully!`,
        user: user,
      });
    } catch (error) {
      // Log the error from MongoDB when creating the user
      console.log(` error from mongo on creating user, ${error} `);
      // Pass the error to the next middleware function
      next(error);
    }
  } catch (error) {
    // Pass the error to the next middleware function
    next(error);
  }
};

// Export the login function
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Destructure email and password from the request body
    const { email, password } = req.body;

    // Check if email or password is missing
    if (!email || !password) {
      // Respond with a 400 status and an error message
      res.status(400).send({ message: "please fill required fields" });
    }

    // Retrieve the user from the database by email and select the necessary authentication fields
    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password +authentication.sessionToken"
    );

    // Check if the user doesn't exist
    if (!user) {
      // Respond with a 400 status and an error message
      return res.status(400).send({ message: "user doesn't exist!" });
    }

    // Calculate the expected password hash using the stored salt and the provided password
    const expectedHash = Authentication(user!.authentication.salt, password);

    // Check if the stored password hash doesn't match the expected hash
    if (user!.authentication.password !== expectedHash) {
      // Respond with a 403 status and an error message
      return res.status(403).json({ message: "incorrect credentials!." });
    }

    // Generate a new random salt for the session token
    const salt = random();

    // Create a new session token using the salt and user ID
    user!.authentication.sessionToken = Authentication(
      salt,
      user!._id.toString()
    );

    // Save the updated user document with the new session token
    await user?.save();

    // Calculate the cookie expiration date (4 hours)
    const expiresIn = 4 * 60 * 60 * 1000;
    const now = new Date();
    const expire = new Date(now.getTime() + expiresIn);
    const options: any = {
      path: "/",
      expires: expire, // 4 hours in milliseconds
      httpOnly: true,
    };

    if (NODE_ENV === "production") {
      options.domain = "scissor.onrender.com";
    }

    // Set a cookie containing the session token with the appropriate domain, path, and expiration
    res.cookie("sessionToken", user!.authentication.sessionToken, options);

    // Respond with a 200 status and a success message along with the user data
    res.status(200).json({ message: "user logged in successfully!", user });
  } catch (error) {
    // Pass the error to the next middleware for error handling
    next(error);
  }
};
