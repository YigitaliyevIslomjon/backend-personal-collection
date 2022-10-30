const { Collection } = require("../model/collectionModal");
const { Item, validateItem } = require("../model/itemModal");
const { Tag } = require("../model/tagModal");

require("express-async-errors");

const getItemList = async (req, res) => {
  let { pageNumber, pageSize } = req.query;
  let total_page_count = parseInt((await Item.find().count()) / pageSize) + 1;
  const item = await Item.find({})
    .populate("user_id collection_id tags")
    .sort({
      created_at: "desc",
    })
    .skip(pageSize * (pageNumber - 1))
    .limit(pageSize)
    .lean();

  return res.status(200).json({
    item,
    pagenation: {
      pageNumber: +pageNumber,
      pageSize: +pageSize,
      total_page_count,
    },
  });
};

const getItemById = async (req, res) => {
  const item = await Item.findOne({ _id: req.params.id }).populate(
    "collection_id tags user_id"
  );

  if (!item) {
    return res.status(404).json({ error: "bunday data mavjuda emas" });
  }
  const item_extra_field = await Item.findOne({ _id: req.params.id }).select(
    "checkbox_field int_field int_field str_field textare_field date_field -_id"
  );

  return res.status(200).json({ item, item_extra_field });
};

const getItemCollectionById = async (req, res) => {
  const { collection_id } = req.query;
  let collection = await Collection.findById(collection_id).populate(
    "user_id topic_id"
  );
  if (!collection) {
    return res.status(404).json({ error: "Not Found" });
  }

  return res.status(200).json(collection);
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

  let updateItem = await Item.findByIdAndUpdate(
    req.params.id,
    {
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
    },
    { new: true }
  );

  res.status(200).json({ message: "succuss" });
};

const deleteItem = async (req, res) => {
  let id = req.params.id;
  const item = await Item.findByIdAndDelete(id);
  if (!item) {
    return res.status(400).json({ error: "Item not found" });
  }
  item.remove();
  return res.status(200).json("success");
};

module.exports = {
  getItemList,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getItemCollectionById,
};
