const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const topicSchema = new Schema({
  topic_name: {
    type: String,
    unique: true,
  },
  created_at: {
    type: Date,
    required: false,
    default: new Date(),
  },

  updated_at: { type: Date, required: false, default: new Date() },
});

const Topic = mongoose.model("Topic", topicSchema);
const validateTopic = (data) => {
  const tagSchema = Joi.object({
    topic_name: Joi.string().required(),
  });
  return tagSchema.validate(data);
};

module.exports = {
  Topic,
  validateTopic,
};
