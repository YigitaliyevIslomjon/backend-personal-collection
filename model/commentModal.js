const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  item_id: {
    type: Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: {
    type: Date,
    required: false,
    default: new Date(),
  },

  updated_at: { type: Date, required: false, default: new Date() },
});

commentSchema.index({ text: "text" });

const Comment = mongoose.model("Comment", commentSchema);
Comment.on("index", function (error) {
  if (error && error.message) {
    console.log(` error:${error.message}`);
  }
});

const validateComment = (data) => {
  let commentSchema = Joi.object({
    comment: Joi.string().required(),
    item_id: Joi.string().required(),
  });
  return commentSchema.validateComment(data);
};

module.exports = { Comment, validateComment };
