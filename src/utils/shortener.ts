// Import necessary modules and classes
import shortid from "shortid"; // import shortid module for generating unique short IDs

import { URL_Model, shortenedURL } from "../model/urlModel"; // import URL_Model and shortenedURL types from urlModel

// Define an async function to shorten a given URL, returning a Promise of type shortenedURL
export const shortenURL = async (
  originalURL: string
): Promise<shortenedURL> => {
  const existingURL = await URL_Model.findOne({ original_url: originalURL }); // find an existing URL document in the database with the same original URL

  if (existingURL) return existingURL; // if an existing URL is found, return it

  const short_id = shortid.generate(); // generate a unique short ID using shortid module

  const newURL = new URL_Model({ original_url: originalURL, short_id }); // create a new URL document with the original URL and generated short ID

  await newURL.save(); // save the new URL document to the database
  return newURL; // return the new URL document
};
