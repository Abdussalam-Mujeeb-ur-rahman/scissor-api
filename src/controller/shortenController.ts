// Import necessary modules and classes
import { Request, Response, NextFunction } from "express"; // import Request, Response, and NextFunction types from express module

import { shortenURL } from "../utils/shortener"; // import shortenURL function from shortener utility
import { URL_Model } from "../model/urlModel"; // import URL_Model from urlModel.
import { userModel } from "../model/userModel"; // import userModel for typing

// Define the CustomRequest interface
interface CustomRequest extends Request {
  identity?: any; // Use any for now to match the middleware typing
}

// Define an async function to create a new shortened URL
export const createNewUrl = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { url } = req.body; // extract the url from the request body
    const userId = req.identity?._id; // get the user ID from the authenticated user

    if (!url) return res.json({ message: "Please send a valid url" }); // if the url is not provided, return an error message

    const shortenedURL = await shortenURL(url, userId); // call the shortenURL function to create a shortened URL with user ID

    res
      .status(201)
      .json({ message: "url created successfully!", shortenedURL }); // send a success message with the shortened URL
  } catch (error) {
    next(error); // if there's an error, pass it to the next middleware (error handler)
  }
};

// Define an async function to get the original URL for the given short_id
export const getURL = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { short_id } = req.params; // extract the short_id from the request parameters

    const url = await URL_Model.findOne({ short_id }); // find the URL document in the database with the given short_id

    if (!url) return res.status(404).json({ message: "short_id not found!" }); // if the short_id is not found, send a 404 status and return an error message

    res.redirect(url.original_url); // redirect the user to the original URL
  } catch (error) {
    next(error); // if there's an error, pass it to the next middleware (error handler)
  }
};
