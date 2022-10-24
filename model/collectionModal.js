const Joi = require("joi");
const mongoose = require("mongoose");
const { Comment } = require("./commentModal");
const { ItemExtraField } = require("./itemExtraFieldModal");
const { Item } = require("./itemModal");
const { Like } = require("./likeModal");
const { Schema } = mongoose;

const collectionSchema = new Schema({
  collection_name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  mark_down: {
    type: Boolean,
    default: false,
  },
  topic_id: {
    type: Schema.Types.ObjectId,
    ref: "Topic",
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  path: { type: String, required: true },
  created_at: {
    type: Date,
    required: false,
    default: new Date(),
  },

  updated_at: { type: Date, required: false, default: new Date() },
});

collectionSchema.index({ collection_name: "text" });

// delete items when collection is deleted
collectionSchema.pre("remove", async function (next) {
  const collection = this;
  await ItemExtraField.deleteMany({ collection_id: collection._id });

  // delte item and comment realted to items
  let itemList = await Item.find({ collection_id: collection._id })
    .select("_id")
    .lean();
  let itemIdList = itemList.map((item) => String(item._id));
  itemIdList.forEach(async (itemId) => {
    await Comment.findOneAndDelete({ item_id: itemId });
    await Like.findOneAndDelete({ item_id: itemId });
  });

  await Item.deleteMany({ collection_id: collection._id });

  next();
});

const Collection = mongoose.model("Collection", collectionSchema);

Collection.on("index", function (error) {
  if (error && error.message) {
    console.log(` error:${error.message}`);
  }
});

const validateCollection = (data) => {
  let collectionSechema = Joi.object({
    collection_name: Joi.string().required(),
    description: Joi.string().optional(),
    mark_down: Joi.string().optional(),
    topic_id: Joi.string().required(),
  });
  return collectionSechema.validate(data);
};

module.exports = { Collection, validateCollection };
