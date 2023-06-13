import mongoose, { Document, Schema } from "mongoose";

// Define the User interface
interface iUser extends Document {
  name: string;
  email: string;
  authentication: {
    salt: string;
    password: string;
    sessionToken: string;
  };
  role?: string;
}



// Extend the User interface to include the methods interface
interface UserModel extends mongoose.Model<iUser> {}

// Define the User schema
const userSchema = new Schema<iUser>(
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
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model<iUser, UserModel>("User", userSchema); 

// Define methods on the User model
export const getUsers = () => userModel.find();
export const getUserByEmail = (email: string) => userModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => userModel.findOne({
  'authentication.sessionToken': sessionToken,
});
export const getUserById = (id: string) => userModel.findById( id );
export const createUser = (values: Record<string, any>) => new userModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => userModel.findByIdAndDelete( id );
export const updateUserById = (id: string, values: Record<string, any>) => userModel.findByIdAndUpdate( id, values );