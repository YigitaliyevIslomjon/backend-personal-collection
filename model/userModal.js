const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi").extend(require("@joi/date"));
var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { Collection } = require("./collectionModal");
const { Item } = require("./itemModal");
const { Comment } = require("./commentModal");
const { ItemExtraField } = require("./itemExtraFieldModal");
const { Like } = require("./likeModal");
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
    default: [{ block: false }, { view: false }],
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

// delete items when collection is deleted
userSignUpSchema.pre("remove", async function (next) {
  const user = this;
  let collectionList = await Collection.find({ user_id: user._id });
  let collectionIdList = collectionList.map((item) => String(item._id));
  collectionIdList.forEach(async (collectionId) => {
    await ItemExtraField.findOneAndDelete({ collection_id: collectionId });
  });

  await Collection.deleteMany({ user_id: user._id });

  let itemList = await Item.find({ user_id: user._id }).select("_id");
  let itemIdList = itemList.map((item) => String(item._id));
  itemIdList.forEach(async (itemId) => {
    await Comment.findOneAndDelete({ item_id: itemId });
    await Like.findOneAndDelete({ item_id: itemId });
  });

  await Item.deleteMany({ collection_id: collection._id });
  const comment = await Comment.deleteMany({ user_id: user._id });

  await Like.deleteMany({ collection_id: user._id });
  next();
});

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
