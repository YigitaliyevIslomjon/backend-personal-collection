const { Collection } = require("../model/collectionModal");
const { Comment } = require("../model/commentModal");
const { Item } = require("../model/itemModal");
require("express-async-errors");

const searchTargetValue = async (req, res) => {
  const { search, url } = req.body;
  if (url === "/" || url === "/personal") {
    let comment = await Comment.find({ $text: { $search: search } }).populate(
      "item_id user_id"
    );

    let collection = await Collection.find({ $text: { $search: search } })
      .populate("user_id topic_id")
      .select("-__v");
    let item = await Item.find({ $text: { $search: search } }).populate(
      "user_id collection_id tags"
    );
    return res.status(200).json({ item, collection, comment });
  } else if (url === "/item") {
    let item = await Item.find({ $text: { $search: search } });
    return res.status(200).json({ item });
  } else if (url === "/collection") {
    let collection = await Collection.find({ $text: { $search: search } });
    return res.status(200).json({ collection });
  }
};

const searchTagItem = async (req, res) => {
  let tag_id = req.params.tag_id;
  let itemList = await Item.find()
    .where(tag_id)
    .in("tags")
    .populate("user_id collection_id tags");
  return res.status(200).json(itemList);
};

module.exports = { searchTargetValue, searchTagItem };
