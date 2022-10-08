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

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  permissions: {
    type: Array,
    default: [{ block: true }, { view: true }],
  },

  created_at: {
    type: Date,
    required: false,
    default: new Date(),
  },

  updated_at: { type: Date, required: false, default: new Date() },
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
    updated_at: Joi.date().format("DD-MM-YYYY HH:MM:ss").optional(),
    created_at: Joi.date().format("DD-MM-YYYY HH:MM:ss").optional(),
  });

  return userSignUpSchema.validate(data);
}

module.exports = {
  validateUserSignUp,
  User,
};
