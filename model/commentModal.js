const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  text: {
    type: String,
  },
  item_id: {
    type: Schema.Types.ObjectId,
    ref: "Item",
  },
});

const Comment = mongoose.model("Comment", commentSchema);

const validateComment = (data) => {
  let commentSchema = Joi.object({
    comment: Joi.string().required(),
    item_id: Joi.string().required(),
  });
  return commentSchema.validateComment(data);
};

module.exports = { Comment, validateComment };
