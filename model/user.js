const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi").extend(require("@joi/date"));
var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const userSignUpSchema = new Schema({
  user_name: {
    type: String,
    required: true,
  },

  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
  },
  role_id: {
    type: String,
    required: true,
  },
  status: { type: Boolean, required: false, default: false },
  sign_in_at: {
    type: Date,
    required: false,
    default: new Date(),
  },
  sign_up_at: { type: Date, required: false, default: new Date() },
});

userSignUpSchema.methods.generateAccessToken = function () {
  let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY_TOKEN);
  return token;
};

const User = mongoose.model("User", userSignUpSchema);

function validateUserSignUp(data) {
  const userSignUpSchema = Joi.object({
    user_name: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
    status: Joi.boolean().optional(),
    sign_in_at: Joi.date().format("DD-MM-YYYY HH:MM:ss").optional(),
    sign_up_at: Joi.date().format("DD-MM-YYYY HH:MM:ss").optional(),
  });

  return userSignUpSchema.validate(data);
}

module.exports = {
  validateUserSignUp,
  User,
};
