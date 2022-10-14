const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const collectionSchema = new Schema({
  collection_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mark_down: {
    type: Boolean,
    default: false,
  },
  topic_id: {
    type: Schema.Types.ObjectId,
    ref: "Topic",
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  path: { type: String, required: true },
  created_at: {
    type: Date,
    required: false,
    default: new Date(),
  },

  updated_at: { type: Date, required: false, default: new Date() },
});

collectionSchema.index({ collection_name: "text" });

const Collection = mongoose.model("Collection", collectionSchema);

Collection.on("index", function (error) {
  if (error && error.message) {
    console.log(` error:${error.message}`);
  }
});

const validateCollection = (data) => {
  let collectionSechema = Joi.object({
    collection_name: Joi.string().required(),
    description: Joi.string().optional(),
    mark_down: Joi.string().optional(),
    topic_id: Joi.string().required(),
  });
  return collectionSechema.validate(data);
};

module.exports = { Collection, validateCollection };
