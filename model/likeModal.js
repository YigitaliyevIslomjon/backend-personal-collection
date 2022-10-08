const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const likeSchema = new Schema({
  like_status: {
    type: String,
    enum: ["1", "0"],
    default: "0",
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  item_id: {
    type: Schema.Types.ObjectId,
    ref: "Item",
  },
  created_at: {
    type: Date,
    required: false,
    default: new Date(),
  },

  updated_at: { type: Date, required: false, default: new Date() },
});

const Like = mongoose.model("Like", likeSchema);

const validateLike = (data) => {
  const likeSchema = Joi.object({
    like_status: Joi.boolean().required(),
  });
  return likeSchema.validate(data);
};

module.exports = {
  Like,
  validateLike,
};
