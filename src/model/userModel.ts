// Import necessary modules and classes
import mongoose, { Document, Schema } from "mongoose"; // import mongoose and its Document and Schema types

// Define the User interface
interface iUser extends Document { // define an interface iUser that extends the Document interface from mongoose
  name: string;
  email: string;
  authentication: {
    salt: string;
    password: string;
    sessionToken: string;
  };
  role?: string; // optional property
}

// Extend the User interface to include the methods interface
interface UserModel extends mongoose.Model<iUser> {} // define an interface UserModel that extends the mongoose.Model interface with iUser as the generic type

// Define the User schema
const userSchema = new Schema<iUser>( // create a new mongoose schema with iUser as the generic type
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    authentication: {
      password: { type: String, required: true, select: false },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false, default: '' },
    },
    role: {
      type: String,
      required: true,
      enum: ["user"],
      default: "user",
    },
  },
  { timestamps: true } // enable timestamps for created and updated fields
);

export const userModel = mongoose.model<iUser, UserModel>("User", userSchema); // create a User model using the userSchema and export it as 'userModel'

// Define methods on the User model
export const getUserByEmail = (email: string) => userModel.findOne({ email }); // define a method to get a user by email
export const getUserBySessionToken = (sessionToken: string) => userModel.findOne({
  'authentication.sessionToken': sessionToken,
}); // define a method to get a user by session token
export const getUserById = (id: string) => userModel.findById(id); // define a method to get a user by ID
export const createUser = (values: Record<string, any>) => new userModel(values).save().then((user) => user.toObject()); // define a method to create a new user
export const deleteUserById = (id: string) => userModel.findByIdAndDelete(id); // define a method to delete a user by ID
export const updateUserById = (id: string, values: Record<string, any>) => userModel.findByIdAndUpdate(id, values); // define a method to update a user by ID

