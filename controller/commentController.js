const { Comment } = require("../model/commentModal");
require("express-async-errors");

const getCommentListByItemId = async (req, res) => {
  const comment = await Comment.find({ item_id: req.params.item_id }).populate(
    "user_id"
  );
  return res.status(200).json(comment);
};

const createComment = async (req, res) => {
  let { text, item_id } = req.body;
  let comment = await new Comment({
    text,
    item_id,
    user_id: req.user._id,
  });

  comment = await comment.populate("user_id");
  comment = await comment.save();
  let io = req.app.locals.io;
  setTimeout(() => {
    io.sockets.emit("send-comment", comment);
  }, 2000);

  res.status(200).json(comment);
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
  getCommentListByItemId,
  createComment,
  updateComment,
  deleteComment,
};
