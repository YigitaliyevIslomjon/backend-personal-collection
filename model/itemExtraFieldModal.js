const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemExtraFieldSchema = new Schema({
  int_field: [],
  str_field: [],
  textare_field: [],
  checkbox_field: [],
  date_field: [],
  collection_id: {
    type: Schema.Types.ObjectId,
    ref: "Collection",
    required: true,
  },
  created_at: {
    type: Date,
    required: false,
    default: new Date(),
  },

  updated_at: { type: Date, required: false, default: new Date() },
});

const ItemExtraField = mongoose.model("ItemExtraField", itemExtraFieldSchema);

const validateItemExtraField = (data) => {
  const itemExtraFieldSchema = Joi.object({
    int_field: Joi.array().required(),
    str_field: Joi.array().required(),
    textare_field: Joi.array().required(),
    checkbox_field: Joi.array().required(),
    date_field: Joi.array().required(),
    collection_id: Joi.string().required(),
  });

  return itemExtraFieldSchema.validate(data);
};

module.exports = {
  ItemExtraField,
  validateItemExtraField,
};
