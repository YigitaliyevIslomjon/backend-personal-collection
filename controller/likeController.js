import Like from "../model/likeModal.js";
import "express-async-errors";
import User from "../model/userModal.js";

export const getLikeList = async (req, res) => {
  const like = await Like.find({}).populate("user item");
  return res.status(200).json(like);
};

export const createLike = async (req, res) => {
  const { item_id, user_id, like_status } = req.body;
  let checking = await User.findOne({ _id: user_id });

  if (!checking) {
    return res.status(400).json("bunday user ma'lumot mavjuda emas");
  }

  let like = await Like.findOneAndUpdate(
    { user_id: user_id },
    {
      like_status: like_status,
      user_id,
    },
    {
      new: true,
    }
  );

  if (!like) {
    like = new Like({
      like: true,
      user_id: user_id,
      item_id: item_id,
    });
    like = await like.save();
  }
  let like_count = await Like.countDocuments();
  res.status(200).json({
    like_count: like_count,
  });
};

export const updateLike = async (req, res) => {
  const { item_id, user_id, like_status } = req.body;
  let like = await Like.findOneAndUpdate(
    { user_id: user_id },
    {
      like_status: like_status,
      user_id,
    },
    {
      new: true,
    }
  );

  if (!like) {
    like = new Like({
      like: true,
      user_id: user_id,
      item_id: item_id,
    });
    like = await like.save();
  }

  res.status(200).json(like);
};

export const deleteLike = async (req, res) => {
  const checking = await Like.findById(req.params.id);
  if (!checking) {
    return res.status(400).json("bunday Like mavjud emas");
  }

  let id = req.params.id;
  const result = await Like.findByIdAndDelete(id);
  if (!result) {
    return res.status(200).json("error");
  }
  return res.status(200).json("success");
};
