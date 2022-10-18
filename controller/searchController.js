const { Collection } = require("../model/collectionModal");
const { Comment } = require("../model/commentModal");
const { Item } = require("../model/itemModal");
require("express-async-errors");

const searchTargetValue = async (req, res) => {
  const { search, url } = req.body;
  if (url === "/") {
    let comment = await Comment.find({ $text: { $search: search } }).populate(
      "item_id user_id"
    );

    let collection = await Collection.find({ $text: { $search: search } })
      .populate("user_id topic_id")
      .select("-__v");
    let item = await Item.find({ $text: { $search: search } }).populate(
      "user_id collection_id tags"
    );
    return res.status(200).json({ item, collection, comment, searchUrl: "/" });
  } else if (url === "/personal") {
    let collection = await Collection.find({
      $text: { $search: search },
      user_id: req.user._id,
    })
      .populate("user_id topic_id")
      .select("-__v");

    return res
      .status(200)
      .json({ item: [], collection, comment: [], searchUrl: "/personal" });
  } else if (url === "/item") {
    let item = await Item.find({
      $text: { $search: search },
      searchUrl: "/item",
    });
    return res
      .status(200)
      .json({ item, collection: [], comment: [], searchUrl: "/item" });
  } else if (url === "/collection") {
    let collection = await Collection.find({
      $text: { $search: search },
    });
    return res
      .status(200)
      .json({ collection, item: [], comment: [], searchUrl: "/collection" });
  }
};

const searchTagItem = async (req, res) => {
  let tag_id = req.params.tag_id;
  let itemList = await Item.find()
    .where("tags")
    .in(tag_id)
    .populate("user_id collection_id tags");
  return res.status(200).json(itemList);
};

module.exports = { searchTargetValue, searchTagItem };
