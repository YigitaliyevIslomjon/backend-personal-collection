const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const collectionSchema = new Schema({
  collection_name: {
    type: String,
  },
  description: {
    type: String,
  },
  mark_down: {
    type: Boolean,
    default: false,
  },
  topic_id: {
    type: Schema.Types.ObjectId,
    ref: "Topic",
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
    collection_name: Joi.string().required(),
    description: Joi.string().optional(),
    mark_down: Joi.string().optional(),
    topic_id: Joi.string().required(),
    img: Joi.binary().required(),
  });
  return collectionSechema.validate(data);
};

module.exports = { Collection, validateCollection };
