import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { Schema } = mongoose;

export const userSchema = new Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  role_id: {
    type: Schema.Types.ObjectId,
    ref: "Role",
  },
  password: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
export default User;

export function generateAccessToken(userId) {
  return jwt.sign({ _id: userId }, process.env.TOKEN_SECRET);
}
