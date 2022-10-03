const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");

const collectionSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  topic: {
    type: String,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  path: { type: String },
});

const Collection = mongoose.model("Collection", collectionSchema);

const validateCollection = (data) => {
  let collectionSechema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    topic: Joi.string().required(),
    user_id: Joi.string().required(),
    path: Joi.string().required(),
  });
  return collectionSechema.validate(data);
};

module.exports = { Collection, validateCollection };
