const { Collection, validateCollection } = require("../model/collectionModal");
require("express-async-errors");

const getCollectionList = async (req, res) => {
  const collection = await Collection.find({})
    .populate("user_id topic_id")
    .select("-__v");
  return res.status(200).json(collection);
};

const getCollectionById = async (req, res) => {
  const collection = await Collection.findById(req.params.id)
    .populate("user_id topic_id")
    .select("-__v");
  if (!collection) {
    return res.status(404).send({ message: "No such collection" });
  }

  return res.status(200).json(collection);
};

const createCollection = async (req, res) => {
  console.log(req?.file);
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
    path: req?.file?.path,
  });
  const result = await collection.save();
  res.status(200).json({ data: result });
};

const updateCollection = async (req, res) => {
  const { collection_name, description, topic, user_id } = req.body;

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
      path: req?.file?.path,
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
    return res.status(200).json({ error: "id not found" });
  }
  return res.status(200).json({ message: "success" });
};

module.exports = {
  getCollectionList,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection,
};
