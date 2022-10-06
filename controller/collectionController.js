const { Collection, validateCollection } = require("../model/collectionModal");
const { ItemExtraField } = require("../model/itemExtraFieldModal");
const { Item } = require("../model/itemModal");

require("express-async-errors");

const getCollectionList = async (req, res) => {
  const collection = await Collection.find({}).populate("user_id");
  return res.status(200).json({ data: collection });
};

const getCollectionById = async (req, res) => {
  const item = await Item.find({
    collection_id: req.params.id,
  }).populate("collection_id");
  const itemField = await ItemExtraField.find({
    collection_id: req.params.id,
  }).select("-collection_id -__v -_id");
  console.log(itemField);
  return res.status(200).json({ data: item, item_field: itemField });
};

const createCollection = async (req, res) => {
  let { error } = validateCollection(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { collection_name, description, topic_id, mark_down } = req.body;

  const collection = new Collection({
    collection_name,
    description,
    topic_id,
    user_id: req.user._id,
    mark_down,
    path: req.file.filename,
  });
  const result = await collection.save();
  res.status(200).json({ data: result });
};

const updateCollection = async (req, res) => {
  const { collection_name, description, topic, user_id, img } = req.body;

  const result = await Collection.findById(req.params.id);
  if (!result) {
    return res.status(400).json({ error: "bunday collection mavjud emas" });
  }
  const updatecollection = await Collection.findByIdAndUpdate(
    req.params.id,
    {
      collection_name,
      description,
      topic,
      user_id,
      path,
    },
    {
      new: true,
    }
  );
  return res.status(200).json(updatecollection);
};

const deleteCollection = async (req, res) => {
  let id = req.params.id;
  const result = await Collection.findByIdAndDelete(id);
  if (!result) {
    return res.status(200).json("error");
  }
  return res.status(200).json("success");
};

module.exports = {
  getCollectionList,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection,
};
