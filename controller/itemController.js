const { Item, validateItem } = require("../model/itemModal");
const { Tag } = require("../model/tagModal");

require("express-async-errors");

const getItemList = async (req, res) => {
  const item = await Item.find({});
  return res.status(200).json(item);
};

const getItemById = async (req, res) => {
  const item_list = await Item.findOne({ _id: req.params.id })
    .select("_id tags item_name path collection_id")
    .populate({
      path: "collection_id",
      model: "Collection",
      select: { _id: 1, collection_name: 1 },
    })
    .populate({
      path: "tags",
      model: "Tag",
      select: { tag_name: 1, _id: 0 },
    });
  if (!item_list) {
    return res.status(404).json({ error: "bunday data mavjuda emas" });
  }
  const item_extra_field = await Item.findOne({ _id: req.params.id }).select(
    "checkbox_field int_field int_field str_field textare_field date_field -_id"
  );

  return res.status(200).json({ item_list, item_extra_field });
};

const createItem = async (req, res) => {
  var bodyData = req.body;
  for (let i of Object.keys(bodyData)) {
    bodyData[i] = JSON.parse(bodyData[i]);
  }
  const { error } = validateItem(bodyData);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const {
    item_name,
    collection_id,
    tags,
    int_field,
    str_field,
    textare_field,
    checkbox_field,
    date_field,
  } = bodyData;

  let tagIds = tags.map(async (item) => {
    let thereIs = await Tag.findOne({ tag_name: item });
    if (!thereIs) {
      let tag = new Tag({ tag_name: item });
      tag = await tag.save();
      return tag._id;
    }
    return thereIs._id;
  });

  let data = await Promise.all(tagIds);
  let result = new Item({
    item_name,
    collection_id,
    user_id: req.user._id,
    tags: data,
    int_field,
    str_field,
    textare_field,
    checkbox_field,
    date_field,
    path: req?.file?.path,
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
    return res.status(400).json({ error: "Item not found" });
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
