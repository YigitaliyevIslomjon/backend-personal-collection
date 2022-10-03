const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const likeSchema = new Schema({
  like_status: {
    type: String,
    enum: [1, 0],
    default: 0,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  item_id: {
    type: Schema.Types.ObjectId,
    ref: "Item",
  },
});

const Like = mongoose.model("Like", likeSchema);

const validateLike = (data) => {
  const likeSchema = Joi.object({
    like_status: Joi.boolean().required(),
    user_id: Joi.string().required(),
    item_id: Joi.string().required(),
  });
  return likeSchema.validate(data);
};

module.exports = {
  Like,
  validateLike,
};
