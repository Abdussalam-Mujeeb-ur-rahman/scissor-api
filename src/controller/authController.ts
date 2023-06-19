// Import necessary modules and libraries

import { Request, Response, NextFunction } from "express";
import { createUser, getUserByEmail } from "../model/userModel";
import { Authentication, random } from "../utils";
import { sendConfirmationEmail } from "../utils/sendGrid";

// Load environment variables
require("dotenv").config();

// Store the mapping between unique IDs and random strings
const randomStrings: Map<string, string> = new Map();

// to generate confirmation link.
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

  try {
    const requestBody = JSON.stringify(req.body);
    const randomString = Buffer.from(requestBody).toString("base64");
    const uniqueID = Math.random().toString(36).substring(2, 9);
    console.log(uniqueID);
    randomStrings.set(uniqueID, randomString);
    const link = `http://${req.hostname}:5050/auth/:${uniqueID}`;

    const response = await sendConfirmationEmail(req.body.email, link);
    res.json({ response: response });
  } catch (error) {
    next(error);
  }
};


// extract and create user from link sent.
export const extractAndCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const randomString = randomStrings.get(id);

    if (!randomString) return res.send("link not found!");
    const requestBody = Buffer.from(randomString, "base64").toString();
    const reqBody = JSON.parse(requestBody);
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

      res.status(201).json({
        message: `user created successfully!`,
        user: user
      })


    } catch (error) {
      console.log(` error from mongo on creating user, ${error} `);
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

// Define the login function
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Destructure email and password from the request body
    const { email, password } = req.body;

    // If email or password is missing, respond with a 400 status and an error message
    if (!email || !password)
      res.status(400).send({ message: "please fill required fields" });

    // Retrieve the user from the database by email and select the necessary authentication fields
    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password +authentication.sessionToken"
    );

    // If the user doesn't exist, respond with a 400 status and an error message
    if (!user) res.status(400).send({ message: "user doesn't exist!" });

    // Calculate the expected password hash using the stored salt and the provided password
    const expectedHash = Authentication(user!.authentication.salt, password);

    // If the stored password hash doesn't match the expected hash, respond with a 403 status and an error message
    if (user!.authentication.password !== expectedHash)
      res.status(403).send({ message: "incorrect credentials!." });

    // Generate a new random salt for the session token
    const salt = random();

    // Create a new session token using the salt and user ID
    user!.authentication.sessionToken = Authentication(
      salt,
      user!._id.toString()
    );

    // Save the updated user document with the new session token
    await user?.save();

    // Set a cookie containing the session token with the appropriate domain, path, and expiration
    res.cookie("sessionToken", user!.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours in milliseconds
    });

    // Respond with a 200 status and a success message along with the user data
    res.status(200).json({ message: "user logged in successfully!", user });
  } catch (error) {
    // If an error occurs, pass it to the next middleware for error handling
    next(error);
  }
};
