import Joi from "joi";
import mongoose from "mongoose";
const { Schema } = mongoose;

export const itemSchema = new Schema({
  item_name: {
    type: String,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  collection_id: {
    type: Schema.Types.ObjectId,
    ref: "Collection",
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  int_field: [],
  str_field: [],
  textare_field: [],
  checkbox_field: [],
  date_field: [],
});

const Item = mongoose.model("Item", itemSchema);

const validateItem = (data) => {
  const itemSchema = Joi.Object({
    item_name: Joi.string().required(),
    tags: Joi.array().required(),
    collection_id: Joi.string().required(),
    user_id: Joi.string().required(),
    int_field: Joi.array().required(),
    str_field: Joi.array().required(),
    textare_field: Joi.array().required(),
    checkbox_field: Joi.array().required(),
    date_field: Joi.array().required(),
  });
  return itemSchema.validateItem(data);
};

module.exports = {
  Item,
  validateItem,
};
