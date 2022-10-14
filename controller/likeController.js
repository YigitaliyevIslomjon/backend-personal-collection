const { Like } = require("../model/likeModal");
require("express-async-errors");

const getLikeList = async (req, res) => {
  let { item_id } = req.query;
  let like_count = await Like.find({
    item_id: item_id,
    like_status: "1",
  }).count();

  let like_status = await Like.findOne({
    item_id: item_id,
    user_id: req.user._id,
  }).select("like_status -_id");
  if (!like_status) {
    like_status = "0";
  }
  return res.status(200).json({ count: like_count, like_status });
};

const createLike = async (req, res) => {
  const { like_status, item_id } = req.body;

  let like = await Like.findOneAndUpdate(
    { user_id: req.user._id, item_id: item_id },
    {
      like_status: like_status,
    },
    {
      new: true,
    }
  );
  if (!like) {
    like = await new Like({
      like_status: like_status,
      user_id: req.user._id,
      item_id: item_id,
    });
    like = await like.save();
  }

  let like_count = await Like.find({
    item_id: item_id,
    like_status: "1",
  }).count();
  res.status(200).json({ count: like_count });
};

module.exports = {
  getLikeList,
  createLike,
};
