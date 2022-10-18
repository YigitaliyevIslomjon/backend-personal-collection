const { Collection, validateCollection } = require("../model/collectionModal");
const { Item } = require("../model/itemModal");
require("express-async-errors");

const getCollectionList = async (req, res) => {
  const collection = await Collection.find({})
    .populate("user_id topic_id")
    .select("-__v");
  return res.status(200).json(collection);
};
const getCollectionListByUser = async (req, res) => {
  const collection = await Collection.find({ user_id: req.user._id })
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

const getItemListByCollectionId = async (req, res) => {
  let { collection_id, pageSize, pageNumber } = req.query;
  const item = await Item.find({ collection_id: collection_id })
    .populate("user_id collection_id tags")
    .sort({
      created_at: "asc",
    })
    .skip(pageSize * (pageNumber - 1))
    .limit(pageSize);
  return res.status(200).json(item);
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

const getlargerCollection = async (req, res) => {
  let items = await Item.find(
    {},
    {
      collection_id: 1,
      _id: 0,
    }
  );

  let collectionIdList = items.map((item) => item.collection_id.toString());
  let collectionSetIdList = new Set(collectionIdList);

  let commonColletionList = [];

  collectionSetIdList.forEach((item) => {
    let count = 0;
    collectionIdList.forEach((child) => {
      if (item === child) {
        count++;
      }
    });
    commonColletionList.push({
      count: count,
      collection_id: item,
    });
    count = 0;
  });
  commonColletionList = commonColletionList
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  let commonColletionListCopy = commonColletionList;
  let largeCollectionIdList = commonColletionList.map(
    (item) => item.collection_id
  );

  let collection = await Collection.find()
    .lean()
    .populate("user_id topic_id")
    .where("_id")
    .in(largeCollectionIdList);

  collection = collection.map((item) => {
    commonColletionListCopy.forEach((child) => {
      if (String(item._id) === child.collection_id) {
        item = { ...item, item_count: child.count };
      }
    });

    return item;
  });

  return res.status(200).json(collection);
};

module.exports = {
  getlargerCollection,
  getCollectionList,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection,
  getItemListByCollectionId,
  getCollectionListByUser,
};
