// Import necessary modules and classes
import mongoose, { Document } from "mongoose"; // import mongoose and Document type from mongoose module

// Define an interface for shortenedURL that extends Document
export interface shortenedURL extends Document {
  original_url: string; // property to store the original URL
  short_id: string; // property to store the unique short ID
  user_id: string; // property to store the user ID who created this URL
}

// Create a new mongoose schema for URL documents
const URL_Schema = new mongoose.Schema({
  original_url: {
    type: String, // define original_url as a string
    required: true, // make original_url a required field
  },
  short_id: {
    type: String, // define short_id as a string
    required: true, // make short_id a required field
  },
  user_id: {
    type: String, // define user_id as a string
    required: true, // make user_id a required field
    ref: "User", // reference to the User model
  },
});

// Create a mongoose model for shortenedURL using the URL_Schema
export const URL_Model = mongoose.model<shortenedURL>("urls", URL_Schema);

// Define methods on the URL model
export const deleteUrlsByUserId = (userId: string) =>
  URL_Model.deleteMany({ user_id: userId }); // define a method to delete all URLs by user ID
