const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
  item_name: {
    type: String,
    required: true,
  },

  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
      required: true,
    },
  ],
  collection_id: {
    type: Schema.Types.ObjectId,
    ref: "Collection",
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  path: { type: String, required: false },
  int_field: [],
  str_field: [],
  textare_field: [],
  checkbox_field: [],
  date_field: [],
  created_at: {
    type: Date,
    required: false,
    default: new Date(),
  },

  updated_at: { type: Date, required: false, default: new Date() },
});

itemSchema.index({ item_name: "text" });

const Item = mongoose.model("Item", itemSchema);

const validateItem = (data) => {
  const itemSchema = Joi.object({
    item_name: Joi.string().required(),
    collection_id: Joi.string().required(),
    tags: Joi.array().optional(),
    int_field: Joi.array().optional(),
    str_field: Joi.array().optional(),
    textare_field: Joi.array().optional(),
    checkbox_field: Joi.array().optional(),
    date_field: Joi.array().optional(),
    path: Joi.string().optional(),
    img: Joi.optional(),
  });
  return itemSchema.validate(data);
};

module.exports = {
  Item,
  validateItem,
};
