const { Item } = require("../model/itemModal");
const { Tag } = require("../model/tagModal");

require("express-async-errors");

const getItemList = async (req, res) => {
  const item = await Item.find({});
  return res.status(200).json(item);
};

const getItemById = async (req, res) => {
  const itemList = await Item.findOne({ collection_id: req.params.id }).select(
    "-collection_id -__v -textare_field -checkbox_field -int_field"
  );
  if (!itemList) {
    return res.status(404).json({ error: "bunday data mavjuda emas" });
  }

  return res.status(200).json({ data: itemList });
};

const createItem = async (req, res) => {
  const {
    item_name,
    collection_id,
    user_id,
    tags,
    int_field,
    str_field,

    textare_field,
    checkbox_field,
    date_field,
  } = req.body;

  let newTags = tags.map(async (tag) => {
    let thereIs = await Tag.findOne({ tag });
    if (!thereIs) {
      let newTag = new Tag({ tag_name: tag });
      return newTag.save();
    }
    return thereIs;
  });

  let data = await Promise.all(newTags);
  let result = new Item({
    item_name,
    collection_id,
    user_id,
    tags: data,
    int_field,
    str_field,
    textare_field,
    checkbox_field,
    date_field,
  });
  result.save();
  res.status(200).json({ data: result });
};

const updateItem = async (req, res) => {
  const {
    item_name,
    collection_id,
    user_id,
    tags,
    int_field,
    str_field,

    textare_field,
    checkbox_field,
    date_field,
  } = req.body;

  let newTags = tags.map(async (tag) => {
    let thereIs = await Tag.findOne({ tag_name: tag });
    if (!thereIs) {
      let newTag = new Tag({ tag_name: tag });
      return newTag.save();
    }
    return thereIs;
  });

  let data = await Promise.all(newTags);
  let updateItem = await Item.findByIdAndUpdate(
    req.params.id,
    {
      item_name,
      collection_id,
      user_id,
      tags: data,
      int_field,
      str_field,
      textare_field,
      checkbox_field,
      date_field,
    },
    { new: true }
  );

  res.status(200).json({ data: updateItem });
};

const deleteItem = async (req, res) => {
  let id = req.params.id;
  const result = await Item.findByIdAndDelete(id);
  if (!result) {
    return res.status(200).json("error");
  }
  return res.status(200).json("success");
};

module.exports = {
  getItemList,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
