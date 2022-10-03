const { Comment } = require("../model/commentModal");
require("express-async-errors");

const getCommentList = async (req, res) => {
  const Comment = await Comment.find({}).populate("item_id");
  return res.status(200).json(Comment);
};

const createComment = async (req, res) => {
  const { text, item_id } = req.body;
  const Comment = new Comment({
    text,
    item_id,
  });

  const result = await Comment.save();
  res.status(200).json({ data: result });
};

const updateComment = async (req, res) => {
  const { text, item_id } = req.body;

  const result = await Comment.findById(req.params.id);
  if (!result) {
    return res.status(400).json({ error: "bunday Comment mavjud emas" });
  }

  const updateComment = await Comment.findByIdAndUpdate(
    req.params.id,
    {
      text,
    },
    {
      new: true,
    }
  );
  return res.status(200).json(updateComment);
};

const deleteComment = async (req, res) => {
  let id = req.params.id;
  const result = await Comment.findByIdAndDelete(id);
  if (!result) {
    return res.status(200).json("error");
  }
  return res.status(200).json("success");
};

module.exports = {
  getCommentList,
  createComment,
  updateComment,
  deleteComment,
};
