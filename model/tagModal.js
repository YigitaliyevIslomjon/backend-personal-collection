const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const tagSchema = new Schema({
  tag_name: {
    type: String,
    unique: true,
    required: true,
  },
  created_at: {
    type: Date,
    required: false,
    default: new Date(),
  },

  updated_at: { type: Date, required: false, default: new Date() },
});

const Tag = mongoose.model("Tag", tagSchema);

const validateTag = (data) => {
  const tagSchema = Joi.object({
    tag_name: Joi.string().required(),
  });
  return tagSchema.validate(data);
};

module.exports = {
  Tag,
  validateTag,
};
