const { Collection, validateCollection } = require("../model/collectionModal");
const { ItemExtraField } = require("../model/itemExtraFieldModal");
const { Item } = require("../model/itemModal");
require("express-async-errors");

const getCollectionList = async (req, res) => {
  let { pageNumber, pageSize } = req.query;
  let collection;
  if (pageNumber && pageSize) {
    let total_page_count =
      parseInt((await Collection.find().count()) / pageSize) + 1;
    collection = await Collection.find({})
      .sort({
        created_at: "desc",
      })
      .skip(pageSize * (pageNumber - 1))
      .limit(pageSize)
      .populate("user_id topic_id")
      .select("-__v")
      .lean();
    return res.status(200).json({
      collection,
      pagenation: {
        pageNumber: +pageNumber,
        pageSize: +pageSize,
        total_page_count,
      },
    });
  } else {
    if (req.user.role === "admin") {
      collection = await Collection.find({})
        .lean()
        .sort({
          created_at: "desc",
        })
        .populate("user_id topic_id")
        .select("-__v");
    } else {
      collection = await Collection.find({ user_id: req.user._id })
        .lean()
        .sort({
          created_at: "desc",
        })
        .populate("user_id topic_id")
        .select("-__v");
    }

    return res.status(200).json(collection);
  }
};

const getCollectionListByUser = async (req, res) => {
  let { pageNumber, pageSize } = req.query;
  let total_page_count =
    parseInt((await Collection.find().count()) / pageSize) + 1;
  const collection = await Collection.find({ user_id: req.user._id })
    .sort({
      created_at: "desc",
    })
    .skip(pageSize * (pageNumber - 1))
    .limit(pageSize)
    .populate("user_id topic_id")
    .select("-__v");

  return res.status(200).json({
    collection,
    pagenation: {
      pageNumber: +pageNumber,
      pageSize: +pageSize,
      total_page_count,
    },
  });
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
  let total_item_count = await Item.find({
    collection_id: collection_id,
  }).count();
  let total_page_count = parseInt(total_item_count / pageSize) + 1;
  const item = await Item.find({ collection_id: collection_id })
    .populate("user_id collection_id tags")
    .sort({
      created_at: "asc",
    })
    .skip(pageSize * (pageNumber - 1))
    .limit(pageSize);
  return res.status(200).json({
    item,
    pagenation: {
      pageNumber: +pageNumber,
      pageSize: +pageSize,
      total_page_count,
      total_item_count,
    },
  });
};

const createCollection = async (req, res) => {
  let { error } = validateCollection(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { collection_name, description, topic_id, mark_down } = req.body;
  let collection = new Collection({
    collection_name,
    description,
    topic_id,
    user_id: req.user._id,
    mark_down,
    path: req?.file?.path,
  });

  collection = await collection.save();

  let item_extra_field = await new ItemExtraField({
    int_field: [],
    str_field: [],
    checkbox_field: [],
    textare_field: [],
    date_field: [],
    collection_id: collection._id,
  });

  await item_extra_field.save();

  res.status(200).json({ message: "success" });
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
  const collection = await Collection.findByIdAndDelete(id);
  if (!collection) {
    return res.status(404).json({ error: "id not found" });
  }
  collection.remove();
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

  commonColletionList = commonColletionList.sort((a, b) => b.count - a.count);

  let commonColletionListCopy = commonColletionList;
  let largeCollectionIdList = commonColletionList.map(
    (item) => item.collection_id
  );

  let collection = await Collection.find()
    .where("_id")
    .in(largeCollectionIdList)
    .lean()
    .populate("user_id topic_id");

  collection = collection.map((item) => {
    commonColletionListCopy.forEach((child) => {
      if (String(item._id) === child.collection_id) {
        item = { ...item, item_count: child.count };
      }
    });
    return item;
  });
  collection = collection
    .sort((a, b) => b.item_count - a.item_count)
    .slice(0, 5);
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
